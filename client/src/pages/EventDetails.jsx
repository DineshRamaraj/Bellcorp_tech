import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);



    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/events/${id}`);
                setEvent(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchEvent();
    }, [id]);

    useEffect(() => {
        const checkRegistration = async () => {
            if (user) {
                try {
                    const token = localStorage.getItem('token');
                    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/events/my/registrations`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    // Check if any registration matches the current event ID. 
                    // Handling populated event object or just ID string just in case.
                    const isReg = res.data.some(reg => {
                        if (reg.event && typeof reg.event === 'object') {
                            return reg.event._id === id;
                        }
                        return reg.event === id;
                    });
                    setIsRegistered(isReg);
                } catch (error) {
                    console.error("Error checking registration:", error);
                }
            }
        };
        checkRegistration();
    }, [user, id]);

    const handleRegister = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            setIsRegistering(true);
            const token = localStorage.getItem('token');
            await axios.post(`${import.meta.env.VITE_API_URL}/api/events/${id}/register`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage('Registration successful!');
            setIsRegistered(true);
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Registration failed');
        } finally {
            setIsRegistering(false);
        }
    };

    if (loading || !event) return (
        <div className="flex justify-center items-center h-screen bg-[#FAFAF9]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="pt-24 min-h-screen bg-[#FAFAF9] text-slate-800">
            <div className="max-w-5xl mx-auto px-6 lg:px-8 pb-20">
                <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgb(0,0,0,0.06)] border border-stone-100">
                    {/* Header Banner - Soft Gradient */}
                    <div className={`h-80 w-full bg-gradient-to-r ${getGradient(event.category)} relative flex items-end p-10 md:p-14`}>
                        <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
                        <div className="relative z-10 w-full">
                            <span className="inline-block bg-white/80 backdrop-blur-sm text-slate-800 text-xs font-bold px-4 py-1.5 rounded-full mb-6 shadow-sm border border-white/50">
                                {event.category}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-2 drop-shadow-sm">{event.name}</h1>
                        </div>
                    </div>

                    <div className="p-10 md:p-14">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {/* Main Content */}
                            <div className="md:col-span-2 space-y-10">
                                <div>
                                    <h3 className="text-xl font-bold mb-4 text-slate-900 border-b border-stone-100 pb-2">About Event</h3>
                                    <p className="text-slate-600 leading-relaxed text-lg font-light">{event.description}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-8 pt-6">
                                    <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
                                        <p className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-1">Date & Time</p>
                                        <p className="font-bold text-lg text-slate-800">{new Date(event.date).toLocaleDateString()}</p>
                                        <p className="text-slate-500 font-medium">{new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>
                                    <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
                                        <p className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-1">Location</p>
                                        <p className="font-bold text-lg text-slate-800">{event.location}</p>
                                    </div>
                                    <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
                                        <p className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-1">Organizer</p>
                                        <p className="font-bold text-lg text-slate-800">{event.organizer}</p>
                                    </div>
                                    <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
                                        <p className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-1">Capacity</p>
                                        <p className="font-bold text-lg text-slate-800">{event.capacity} Seats</p>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar / CTA */}
                            <div className="md:col-span-1">
                                <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-xl shadow-stone-200/50 sticky top-28">
                                    <h3 className="text-2xl font-bold mb-4 text-slate-900">Secure Your Spot</h3>
                                    <p className="text-slate-500 text-sm mb-8 leading-relaxed">Don't miss out on this amazing opportunity. Book now before seats run out!</p>

                                    {message ? (
                                        <div className={`mb-6 p-4 rounded-xl text-sm font-bold text-center flex items-center justify-center gap-2 ${message.includes('successful') ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                                            {message}
                                        </div>
                                    ) : isRegistered && (
                                        <div className="mb-6 p-4 rounded-xl text-sm font-bold text-center flex items-center justify-center gap-2 bg-blue-50 text-blue-600 border border-blue-100">
                                            You are already registered for this event
                                        </div>
                                    )}

                                    <button
                                        onClick={handleRegister}
                                        disabled={isRegistering || isRegistered}
                                        className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${user
                                            ? (isRegistered ? 'bg-stone-200 text-stone-500 cursor-not-allowed shadow-none' : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20')
                                            : 'bg-stone-200 hover:bg-stone-300 text-stone-600'
                                            } ${isRegistering ? 'opacity-80 cursor-not-allowed' : ''}`}
                                    >
                                        {isRegistering ? 'Processing...' : (isRegistered ? 'Registered' : (user ? 'Register Now' : 'Login to Register'))}
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

// Reuse gradient helper - Soft Pastels
const getGradient = (category) => {
    switch (category) {
        case 'Music': return 'from-pink-200 to-rose-200';
        case 'Technology': return 'from-blue-200 to-cyan-200';
        case 'Sports': return 'from-green-200 to-emerald-200';
        case 'Business': return 'from-indigo-200 to-violet-200';
        case 'Art': return 'from-amber-200 to-orange-200';
        case 'Education': return 'from-teal-200 to-lime-200';
        default: return 'from-stone-200 to-zinc-200';
    }
};

export default EventDetails;
