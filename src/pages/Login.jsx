import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';

// Helper to set cookie
function setCookie(name, value, days) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Checks email format and password length requirements
  const validate = () => {
    const newErrors = {};

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save JWT token to cookie
  const saveJwtToken = (token, remember) => {
    // If rememberMe, set cookie for 7 days, else session cookie
    setCookie('jwtToken', token, remember ? 7 : undefined);
  };

  // Parse JWT token to get payload data
  const parseJwt = (token) => {
    try {
      // Get the payload part of the JWT (second part)
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error parsing JWT token:', error);
      return null;
    }
  };

  // Setup auth header for future API requests
  const setupAuthHeader = (token) => {
    // This function can be used in an axios instance or fetch wrapper
    // Example for axios:
    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Store in sessionStorage for immediate use in other components
    sessionStorage.setItem('authHeader', `Bearer ${token}`);
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setIsLoading(true);

      try {
        // Make API call to backend for authentication
        // Update endpoint to match your actual authentication endpoint
        const response = await fetch('/vofas/api/v1/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Login failed');
        }

        // JWT token should be in the response
        if (!data.token) {
          throw new Error('JWT token not received');
        }

        // Save JWT token
        const token = data.token;
        saveJwtToken(token, rememberMe);

        // Setup authorization header for future requests
        setupAuthHeader(token);

        // Get user role from JWT token
        const payload = parseJwt(token);
        const userRole = (payload?.role || '').toUpperCase(); // Normalize role

        // Direct to appropriate dashboard based on role
        // Use React Router navigation
        if (userRole === 'ADMIN') {
          alert('Admin login successful! Redirecting to Admin Dashboard...');
          navigate('/admin/dashboard');
        } else if (userRole === 'COMPANY_REPRESENTATIVE') {
          alert('Company representative login successful! Redirecting to Company Dashboard...');
          navigate('/company/dashboard');
        } else {
          alert(`Login successful with email: ${email}`);
          navigate('/user/dashboard');
        }
      } catch (error) {
        // Handle login errors
        setErrors({ general: error.message || 'Login failed. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    // Main container
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-colors-primary-10 to-white p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-colors-primary-30 to-colors-primary-40 p-6">
            <h2 className="text-2xl font-bold text-center text-white">Tekrar Hoş Geldiniz</h2>
            <p className="text-white text-center font-thin mt-2">Hesabınıza giriş yapın</p>
          </div>

          {/* Form */}
          <div className="p-6 space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-posta
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                {/* Email input */}
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-gray-400 placeholder:text-sm`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Şifre
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                {/* Password input */}
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`block w-full pl-10 pr-10 py-2 border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-gray-400 placeholder:text-sm`}
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Beni hatırla
                </label>
              </div>
              <div className="text-sm">
                <a className="font-medium text-colors-primary-40 hover:text-colors-primary-30 cursor-pointer">
                  Şifremi unuttum
                </a>
              </div>
            </div>

            {/* Login Button */}
            <div>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-colors-primary-40 hover:bg-colors-primary-30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-colors-primary-40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isLoading ? (
                  // Loading state
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Yükleniyor...
                  </div>
                ) : (
                  // Submit button
                  <div className="flex items-center">
                    <LogIn size={18} className="mr-2" />
                    Giriş Yap
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
