import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="fixed w-full z-50 top-0 start-0 border-b border-gray-700 bg-gray-900/80 backdrop-blur-md">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                        Bellcorp<span className="text-blue-500">Events</span>
                    </span>
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-gray-300 hidden md:inline">Welcome, {user.name}</span>
                            <button
                                onClick={handleLogout}
                                className="text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center transition-all duration-300 transform hover:scale-105"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Link
                                to="/login"
                                className="text-white hover:text-blue-400 font-medium rounded-lg text-sm px-4 py-2 text-center transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/30"
                            >
                                Get Started
                            </Link>
                        </div>
                    )}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
                        aria-controls="navbar-sticky"
                        aria-expanded={isMenuOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-700 rounded-lg bg-gray-800 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
                        <li>
                            <Link to="/events" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-500 md:p-0" aria-current="page">Events</Link>
                        </li>
                        {user && (
                            <li>
                                <Link to="/dashboard" className="block py-2 px-3 text-gray-300 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-400 md:p-0 transition-colors">Dashboard</Link>
                            </li>
                        )}
                        <li>
                            <a href="#" className="block py-2 px-3 text-gray-300 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-400 md:p-0 transition-colors">About</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-gray-300 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-400 md:p-0 transition-colors">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
