import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  //Checks email format and password length requirements
  const validate = () => {
    const newErrors = {};
    
    //email validation  
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    //password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //Handles form submission 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    if (validate()) {
      setIsLoading(true);
      
      try {
        // Real API call to your backend
        const response = await fetch('http://localhost:8080/vofas/api/v1/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: email, // Using email as username - adjust if your API expects different format
            password: password
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Giriş başarısız');
        }

        // Store the token in localStorage
        localStorage.setItem('token', data.data.token);
        
        // Redirect to dashboard or home page
        navigate('/dashboard');
      } catch (err) {
        setLoginError(err.message || 'Giriş sırasında bir hata oluştu');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    //Main container
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
            {/* Login Error Message */}
            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm">{loginError}</p>
              </div>
            )}
            
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
                  type={showPassword ? "text" : "password"}
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
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
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
                    //Loading state 
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Yükleniyor...
                  </div>
                ) : (
                    //Submit button 
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
