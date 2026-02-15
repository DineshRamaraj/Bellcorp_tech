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

            const res = await axios.get('http://localhost:5000/api/events', { params });
            setEvents(res.data);
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
        <div className="pt-20 min-h-screen bg-gray-900 text-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gray-900 py-16 sm:py-24">
                <div className="absolute top-0 left-1/2 -ml-96 -mt-20 w-[60rem] h-[60rem] rounded-full bg-gradient-to-tr from-blue-700 to-purple-700 opacity-20 blur-3xl animate-blob"></div>
                <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                        Discover Amazing <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Experiences</span>
                    </h1>
                    <p className="mt-4 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
                        Find and book the best confrences, concerts, and workshops happening around you. Join a community of event enthusiasts today.
                    </p>

                    {/* Search & Filter Bar */}
                    <div className="mt-10 max-w-3xl mx-auto bg-white/10 backdrop-blur-lg border border-white/10 p-4 rounded-xl shadow-2xl flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search by Location..."
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-400"
                            />
                        </div>
                        <div className="flex-1">
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <h2 className="text-2xl font-bold mb-8 border-l-4 border-blue-500 pl-4">Upcoming Events</h2>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : events.length === 0 ? (
                    <div className="text-center py-20 bg-gray-800/50 rounded-xl border border-gray-700">
                        <p className="text-gray-400 text-lg">No events found matching your criteria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map(event => (
                            <div key={event._id} className="group bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1">
                                {/* Placeholder Image with Gradient */}
                                <div className={`h-48 w-full bg-gradient-to-br ${getGradient(event.category)} relative`}>
                                    <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-gray-900 to-transparent w-full">
                                        <span className="inline-block bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-2 py-1 rounded-md border border-white/10">
                                            {event.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                                        {event.name}
                                    </h3>
                                    <div className="flex items-center text-gray-400 text-sm mb-4 space-x-4">
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                            {new Date(event.date).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                            {event.location}
                                        </div>
                                    </div>

                                    <Link
                                        to={`/events/${event._id}`}
                                        className="block w-full text-center bg-gray-700 hover:bg-white hover:text-gray-900 text-white font-medium py-3 rounded-xl transition-all duration-300"
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

// Helper for dynamic card headers
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

export default EventDiscovery;
