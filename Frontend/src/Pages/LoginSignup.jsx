import{ useState, useEffect } from 'react';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import api from "../utils/api";

const LoginSignup = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) {
      redirectBasedOnRole(role);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (activeTab === 'signup' && !formData.fullname) {
      newErrors.fullname = 'Full name is required';
    }
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (activeTab === 'signup' && !formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    }
    if (activeTab === 'signup' && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (activeTab === 'signup' && !formData.role) {
      newErrors.role = 'Role is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const redirectBasedOnRole = (role) => {
    switch (role) {
      case 'Admin':
        window.location.href = '/admindb';
        break;
      case 'Organizer':
        window.location.href = '/orgdb';
        break;
      case 'User':
        window.location.href = '/userdb';
        break;
      default:
        setError('Invalid user role');
    }
  };

  const handleLogin = async () => {
    try {
      const loginData = {
        email: formData.email,
        password: formData.password
      };

      const response = await api.post("/users/login", loginData);
      console.log("Login Response:", response.data);

      const { message, token, user } = response.data;

      if (token && user) {
        localStorage.setItem('token', token);
        localStorage.setItem('role', user.role);
        redirectBasedOnRole(user.role);
      } else {
        setError(message || 'Login failed: Invalid response data');
      }
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response?.data?.message) {
        setError(`Error: ${error.response.data.message}`);
      } else if (error.message) {
        setError(`Error: ${error.message}`);
      } else {
        setError("An unknown error occurred. Please try again.");
      }
    }
  };

  const handleSignup = async () => {
    try {
      const response = await api.post("/users/signup", formData);
      console.log("Signup Response:", response.data);

      const { message, user } = response.data;

      if (user) {
        setError('');
        alert(message || 'Signup successful! Please login.');
        setActiveTab('login');
        setFormData(prev => ({
          ...prev,
          fullname: '',
          role: '',
          confirmPassword: ''
        }));
      } else {
        setError('Signup failed: Invalid response data');
      }
    } catch (error) {
      console.error("Signup Error:", error);
      if (error.response?.data?.message) {
        setError(`Error: ${error.response.data.message}`);
      } else if (error.message) {
        setError(`Error: ${error.message}`);
      } else {
        setError("An unknown error occurred. Please try again.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateForm()) return;
    setLoading(true);
    try {
      if (activeTab === 'login') {
        await handleLogin();
      } else {
        await handleSignup();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-blue-600 to-blue-800'} pt-20`}>
      <div className="max-w-md p-6 mx-auto">
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl overflow-hidden`}>
          <div className="flex">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-4 text-center font-semibold transition-colors ${
                activeTab === 'login'
                  ? 'bg-purple-600 text-white'
                  : isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-4 text-center font-semibold transition-colors ${
                activeTab === 'signup'
                  ? 'bg-purple-600 text-white'
                  : isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="p-8">
            <h2 className={`text-2xl font-bold text-center mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {activeTab === 'login' ? 'Welcome Back!' : 'Create Account'}
            </h2>

            {error && (
              <div className="p-4 mb-6 text-sm text-red-600 border border-red-200 rounded-lg bg-red-50">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {activeTab === 'signup' && (
                <div className="relative">
                  <User className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    value={formData.fullname}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'border-gray-300 focus:ring-2 focus:ring-purple-500'
                    } outline-none`}
                  />
                  {errors.fullname && (
                    <p className="mt-1 text-xs text-red-500">{errors.fullname}</p>
                  )}
                </div>
              )}

              <div className="relative">
                <Mail className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full py-3 pl-10 pr-4 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="relative">
                <Lock className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full py-3 pl-10 pr-10 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2 hover:text-gray-600 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </button>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                )}
              </div>

              {activeTab === 'signup' && (
                <div className="relative">
                  <Lock className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full py-3 pl-10 pr-10 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2 hover:text-gray-600 focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <Eye /> : <EyeOff />}
                  </button>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
                  )}
                </div>
              )}

              {activeTab === 'signup' && (
                <div className="relative">
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">Select Role</option>
                    <option value="User">User</option>
                    <option value="Organizer">Organizer</option>
                  </select>
                  {errors.role && (
                    <p className="mt-1 text-xs text-red-500">{errors.role}</p>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center w-full gap-2 py-3 font-semibold text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                {loading ? 'Processing...' : activeTab === 'login' ? 'Login' : 'Sign Up'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            {activeTab === 'login' && (
              <div className="mt-6 text-center">
                <a href="#" className={`text-purple-600 hover:underline ${isDarkMode ? 'text-purple-400' : ''}`}>
                  Forgot your password?
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
