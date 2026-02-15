import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EventDiscovery = () => {
    const [events, setEvents] = useState([]);
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');

    const fetchEvents = async () => {
        try {
            const params = {};
            if (location) params.location = location;
            if (category) params.category = category;

            const res = await axios.get('http://localhost:5000/api/events', { params });
            setEvents(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [location, category]); // Fetch when filters change

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Discover Events</h1>

            {/* Filters */}
            <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Filter by Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border p-2 rounded w-full md:w-1/3"
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border p-2 rounded w-full md:w-1/3"
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

            {/* Event Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map(event => (
                    <div key={event._id} className="bg-white rounded shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="p-4">
                            <h2 className="text-xl font-bold mb-2">{event.name}</h2>
                            <p className="text-gray-600 mb-2">{new Date(event.date).toLocaleDateString()}</p>
                            <p className="text-gray-600 mb-2">{event.location}</p>
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-4">
                                {event.category}
                            </span>
                            <Link to={`/events/${event._id}`} className="block text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventDiscovery;
