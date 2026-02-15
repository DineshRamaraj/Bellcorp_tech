import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">Bellcorp Events</Link>
                <div>
                    <Link to="/events" className="mr-4 hover:text-gray-300">Events</Link>
                    {user ? (
                        <>
                            <Link to="/dashboard" className="mr-4 hover:text-gray-300">Dashboard</Link>
                            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="mr-4 hover:text-gray-300">Login</Link>
                            <Link to="/register" className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
