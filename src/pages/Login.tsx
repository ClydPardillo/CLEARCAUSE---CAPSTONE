
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/hooks/useAuth';
import { config } from '@/lib/config';
import { validateData, signInSchema } from '@/utils/validation';
import { ClearCauseError } from '@/lib/types';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const { user, signIn, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  useEffect(() => {
    if (user && !loading) {
      const from = (location.state as any)?.from?.pathname || getDefaultRedirect(user.role);
      navigate(from, { replace: true });
    }
  }, [user, loading, navigate, location]);

  // Get default redirect based on user role
  const getDefaultRedirect = (role: string) => {
    switch (role) {
      case 'admin':
        return config.routes.admin.dashboard;
      case 'charity':
        return config.routes.charity.dashboard;
      case 'donor':
        return config.routes.donor.dashboard;
      default:
        return config.routes.home;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Validate form data
      const validatedData = validateData(signInSchema, {
        email: email.trim(),
        password,
        rememberMe,
      });

      // Attempt login
      const result = await signIn(validatedData);

      if (result.success && result.data) {
        // Navigation will be handled by the useEffect above
        // The user state will update automatically
      } else {
        setError(result.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      if (error instanceof ClearCauseError) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      // Import the auth service function
      const { signInWithGoogle } = await import('@/lib/auth');
      const result = await signInWithGoogle();
      
      if (!result.success) {
        setError(result.error || 'Google login failed. Please try again.');
      }
      // If successful, the redirect will be handled by Google
    } catch (error) {
      setError('Google login failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center bg-clearcause-background py-12">
        <div className="max-w-md w-full mx-auto px-4 sm:px-6">
          <div className="bg-white shadow rounded-lg p-6 md:p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
              <p className="text-gray-600 mt-2">Sign in to continue to ClearCause</p>
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-clearcause-primary focus:border-clearcause-primary"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Link to="/password-reset" className="text-sm text-clearcause-primary hover:text-clearcause-secondary">
                    Forgot your password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-clearcause-primary focus:border-clearcause-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Eye className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-clearcause-primary focus:ring-clearcause-primary border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full bg-clearcause-primary hover:bg-clearcause-secondary py-2 px-4"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </Button>
              </div>
            </form>

            {config.features.socialLogin && (
              <div className="mt-8 text-center">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6">
                  <Button
                    type="button"
                    onClick={handleGoogleLogin}
                    variant="outline"
                    className="w-full"
                    disabled={loading}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.78 15.71 17.55V20.25H19.28C21.36 18.31 22.56 15.57 22.56 12.25Z" fill="#4285F4"/>
                      <path d="M12 23C14.97 23 17.46 22.01 19.28 20.25L15.71 17.55C14.73 18.19 13.48 18.58 12 18.58C9.09 18.58 6.63 16.65 5.72 14.04H2.05V16.82C3.87 20.42 7.62 23 12 23Z" fill="#34A853"/>
                      <path d="M5.72 14.04C5.5 13.41 5.37 12.73 5.37 12.01C5.37 11.29 5.5 10.61 5.72 9.98002V7.20002H2.05C1.23 8.95002 0.77 10.92 0.77 12.01C0.77 13.1 1.23 15.07 2.05 16.82L5.72 14.04Z" fill="#FBBC05"/>
                      <path d="M12 5.42C13.62 5.42 15.06 5.99 16.21 7.07L19.36 3.92C17.45 2.14 14.97 1 12 1C7.62 1 3.87 3.58 2.05 7.18L5.72 9.96C6.63 7.35 9.09 5.42 12 5.42Z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                  </Button>
                </div>
              </div>
            )}

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">Don't have an account?</span>
              <Link to="/signup" className="ml-1 font-medium text-clearcause-primary hover:text-clearcause-secondary">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
