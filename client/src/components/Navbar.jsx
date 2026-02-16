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
        <nav className="fixed w-full z-50 top-0 start-0 border-b border-stone-200 bg-white/80 backdrop-blur-md shadow-sm">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse group">
                    <span className="self-center text-2xl font-bold whitespace-nowrap text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">
                        Bellcorp<span className="text-blue-500">Events</span>
                    </span>
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-slate-600 font-medium hidden md:inline">Hi, {user.name}</span>
                            <button
                                onClick={handleLogout}
                                className="text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 focus:ring-4 focus:outline-none focus:ring-red-200 font-medium rounded-full text-sm px-5 py-2.5 text-center shadow-lg shadow-red-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Link
                                to="/login"
                                className="text-slate-600 hover:text-blue-600 font-medium rounded-lg text-sm px-4 py-2 text-center transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-6 py-2.5 text-center shadow-lg shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                Get Started
                            </Link>
                        </div>
                    )}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-slate-500 rounded-lg md:hidden hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-200"
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
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-stone-100 rounded-lg bg-stone-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
                        <li>
                            <Link to="/events" className="block py-2 px-3 text-white bg-blue-600 rounded md:bg-transparent md:text-blue-600 md:p-0 font-semibold" aria-current="page">Events</Link>
                        </li>
                        {user && (
                            <li>
                                <Link to="/dashboard" className="block py-2 px-3 text-slate-600 rounded hover:bg-stone-100 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 transition-colors">Dashboard</Link>
                            </li>
                        )}
                        <li>
                            <Link to="/about" className="block py-2 px-3 text-slate-600 rounded hover:bg-stone-100 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 transition-colors">About</Link>
                        </li>
                        <li>
                            <Link to="/contact" className="block py-2 px-3 text-slate-600 rounded hover:bg-stone-100 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 transition-colors">Contact</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
