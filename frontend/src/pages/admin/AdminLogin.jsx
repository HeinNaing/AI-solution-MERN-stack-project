import { useState , useContext} from 'react';
import { Link, useNavigate } from 'react-router';
import { api } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const AdminLogin = () => {

    const {dispatch} = useContext(AuthContext);
        
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value   
        }));
        // Clear error when user starts typing
        if (error) setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await api.login('/admin/login', formData);
            console.log('Login response:', response); // For debugging
            if (response.status === 200) {
                dispatch({
                    type: "LOGIN",
                    payload: response.token
                })
                navigate('/admin/dashboard');
            }

        } catch (err) {
            setError(
                err.response?.data?.errors[0].msg|| 
                'An error occurred during login'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-lg">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white mb-2">Admin Panel</h2>
                    <h3 className="text-xl text-white mb-8">Login</h3>
                </div>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Email"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Password"
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm bg-red-100 bg-opacity-10 p-2 rounded">
                            {error}
                        </div>
                    )}

                    <div className="flex items-center justify-end">
                        <Link to="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300">
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-400">
                    Login to your admin account to continue
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
