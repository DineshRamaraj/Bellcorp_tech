import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EventDiscovery = () => {
    const [events, setEvents] = useState([]);
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const params = {};
            if (location) params.location = location;
            if (category) params.category = category;

            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/events`, { params });
            // Ensure data is always an array
            setEvents(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [location, category]);

    return (
        <div className="pt-20 min-h-screen bg-[#FAFAF9] text-slate-800">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-white/50 py-16 sm:py-24 border-b border-stone-200">
                <div className="absolute top-0 left-1/2 -ml-96 -mt-20 w-[60rem] h-[60rem] rounded-full bg-gradient-to-tr from-blue-100 to-purple-100 opacity-60 blur-3xl animate-blob"></div>
                <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl mb-6 leading-tight">
                        Discover Amazing <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Experiences</span>
                    </h1>
                    <p className="mt-4 text-xl leading-8 text-slate-600 max-w-2xl mx-auto font-light">
                        Find and book the best confrences, concerts, and workshops happening around you.
                    </p>

                    {/* Search & Filter Bar */}
                    <div className="mt-12 max-w-3xl mx-auto bg-white/80 backdrop-blur-md border border-stone-200 p-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col md:flex-row gap-3">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search by Location..."
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full bg-stone-50 border border-stone-200 text-slate-800 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium placeholder-slate-400"
                            />
                        </div>
                        <div className="flex-1">
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-stone-50 border border-stone-200 text-slate-800 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium appearance-none"
                            >
                                <option value="">All Categories</option>
                                <option value="Music">Music</option>
                                <option value="Technology">Technology</option>
                                <option value="Sports">Sports</option>
                                <option value="Education">Education</option>
                                <option value="Business">Business</option>
                                <option value="Art">Art</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Event Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <h2 className="text-2xl font-bold mb-10 text-slate-900 flex items-center">
                    <span className="w-2 h-8 bg-blue-600 rounded-full mr-4"></span>
                    Upcoming Events
                </h2>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                    </div>
                ) : events.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-300 shadow-sm">
                        <p className="text-slate-500 text-lg">No events found matching your criteria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {events.map(event => (
                            <div key={event._id} className="group bg-white rounded-3xl overflow-hidden border border-stone-100 hover:border-stone-200 transition-all duration-500 hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)] hover:-translate-y-2">
                                {/* Placeholder Image with Gradient */}
                                <div className={`h-48 w-full bg-gradient-to-br ${getGradient(event.category)} relative overflow-hidden`}>
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                    <div className="absolute bottom-4 left-4 z-10 w-full">
                                        <span className="inline-block bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                                            {event.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-8">
                                    <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                                        {event.name}
                                    </h3>
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center text-slate-500 text-sm font-medium">
                                            <div className="p-2 bg-stone-50 rounded-lg mr-3 shadow-sm text-blue-500">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                            </div>
                                            {new Date(event.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                                        </div>
                                        <div className="flex items-center text-slate-500 text-sm font-medium">
                                            <div className="p-2 bg-stone-50 rounded-lg mr-3 shadow-sm text-purple-500">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                            </div>
                                            {event.location}
                                        </div>
                                    </div>

                                    <Link
                                        to={`/events/${event._id}`}
                                        className="block w-full text-center bg-stone-50 hover:bg-slate-900 hover:text-white text-slate-700 font-bold py-4 rounded-xl transition-all duration-300 border border-stone-200 hover:border-slate-900 group-hover:shadow-lg"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// Helper for dynamic card headers - Soft Pastels for Milky Theme
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

export default EventDiscovery;
