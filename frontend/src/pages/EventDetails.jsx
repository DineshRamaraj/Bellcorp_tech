import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/events/${id}`);
                setEvent(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchEvent();
    }, [id]);

    const handleRegister = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            setIsRegistering(true);
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:5000/api/events/${id}/register`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage('Registration successful!');
            setTimeout(() => setMessage(''), 3000); // Clear message after 3s
        } catch (error) {
            setMessage(error.response?.data?.message || 'Registration failed');
        } finally {
            setIsRegistering(false);
        }
    };

    if (!event) return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="pt-20 min-h-screen bg-gray-900 text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-gray-800 rounded-3xl overflow-hidden shadow-2xl border border-gray-700">
                    {/* Header Banner */}
                    <div className={`h-64 w-full bg-gradient-to-r ${getGradient(event.category)} relative flex items-end p-8`}>
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                        <div className="relative z-10 w-full">
                            <span className="inline-block bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 border border-white/20">
                                {event.category}
                            </span>
                            <h1 className="text-4xl font-bold text-white mb-2 shadow-sm">{event.name}</h1>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="md:col-span-2 space-y-6">
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 text-blue-400">About Event</h3>
                                    <p className="text-gray-300 leading-relaxed text-lg">{event.description}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                                    <div>
                                        <p className="text-gray-500 text-sm uppercase tracking-wider">Date</p>
                                        <p className="font-semibold text-lg">{new Date(event.date).toLocaleDateString()}</p>
                                        <p className="text-gray-400 text-sm">{new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm uppercase tracking-wider">Location</p>
                                        <p className="font-semibold text-lg">{event.location}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm uppercase tracking-wider">Organizer</p>
                                        <p className="font-semibold text-lg">{event.organizer}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm uppercase tracking-wider">Capacity</p>
                                        <p className="font-semibold text-lg">{event.capacity} Seats</p>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar / CTA */}
                            <div className="md:col-span-1">
                                <div className="bg-gray-750 bg-opacity-50 rounded-2xl p-6 border border-gray-700 sticky top-24">
                                    <h3 className="text-xl font-bold mb-4">Reserve Your Spot</h3>
                                    <p className="text-gray-400 text-sm mb-6">Don't miss out on this amazing opportunity. Book now before seats run out!</p>

                                    {message && (
                                        <div className={`mb-4 p-3 rounded-lg text-sm text-center ${message.includes('successful') ? 'bg-green-500/20 text-green-300 border border-green-500/50' : 'bg-red-500/20 text-red-300 border border-red-500/50'}`}>
                                            {message}
                                        </div>
                                    )}

                                    <button
                                        onClick={handleRegister}
                                        disabled={isRegistering}
                                        className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${user
                                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-blue-500/30'
                                                : 'bg-gray-600 hover:bg-gray-500 text-gray-200'
                                            } ${isRegistering ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    >
                                        {isRegistering ? 'Processing...' : (user ? 'Register Now' : 'Login to Register')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Reuse gradient helper
const getGradient = (category) => {
    switch (category) {
        case 'Music': return 'from-pink-500 to-rose-500';
        case 'Technology': return 'from-blue-500 to-cyan-500';
        case 'Sports': return 'from-green-500 to-emerald-500';
        case 'Business': return 'from-purple-500 to-indigo-500';
        case 'Art': return 'from-yellow-500 to-orange-500';
        default: return 'from-gray-600 to-gray-800';
    }
};

export default EventDetails;
