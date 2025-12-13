-- Transaction to ensure the entire reset operation is atomic
BEGIN;

-- 1. Backup Admin Profile(s)
-- We create a temporary table to hold the admin row(s) we want to preserve.
-- We use an explicit cast to 'user_role' enum for clarity and robustness.
CREATE TEMP TABLE admin_profiles_backup AS
SELECT * FROM public.profiles
WHERE role = 'admin'::public.user_role;

-- 2. Truncate All Tables in Public Schema
-- We use a dynamic anonymous block to select all table names and execute a single
-- TRUNCATE statement. This is more efficient and reliable than looping, and
-- ensures all tables in the public schema are cleared.
DO $$
DECLARE
    -- Variable to hold the comma-separated list of all tables
    tables_to_truncate text;
BEGIN
    -- Aggregate all table names from the public schema
    SELECT string_agg('public."' || tablename || '"', ', ')
    INTO tables_to_truncate
    FROM pg_tables
    WHERE schemaname = 'public';

    -- Execute the TRUNCATE command if tables exist
    IF tables_to_truncate IS NOT NULL THEN
        -- RESTART IDENTITY: Resets sequences (auto-increment IDs) to 1
        -- CASCADE: Removes dependent data (foreign keys) in other tables automatically
        EXECUTE 'TRUNCATE TABLE ' || tables_to_truncate || ' RESTART IDENTITY CASCADE';
    END IF;
END $$;

-- 3. Restore Admin Profile(s)
-- Insert the saved admin data back into the now-empty profiles table.
-- Since we are in the same transaction and haven't touched auth.users, 
-- the UUIDs/Foreign Keys to auth.users remain valid.
INSERT INTO public.profiles
SELECT * FROM admin_profiles_backup;

-- 4. Cleanup
-- Remove the temporary backup table
DROP TABLE admin_profiles_backup;

COMMIT;