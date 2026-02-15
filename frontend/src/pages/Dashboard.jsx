import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRegistrations = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5000/api/events/my/registrations', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setRegistrations(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchRegistrations();
    }, []);

    const now = new Date();
    const upcomingEvents = registrations.filter(r => new Date(r.event.date) > now);
    const pastEvents = registrations.filter(r => new Date(r.event.date) <= now);

    const EventList = ({ title, items, emptyMessage }) => (
        <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="w-1 h-8 bg-blue-500 rounded-full mr-3 block"></span>
                {title}
                <span className="ml-3 text-sm font-normal text-gray-400 bg-gray-800 px-3 py-1 rounded-full border border-gray-700">
                    {items.length}
                </span>
            </h2>

            {items.length === 0 ? (
                <div className="bg-gray-800/50 border border-dashed border-gray-700 rounded-xl p-10 text-center">
                    <p className="text-gray-400 mb-4">{emptyMessage}</p>
                    <Link to="/events" className="text-blue-400 hover:text-blue-300 font-medium hover:underline">Browse Events</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map(reg => (
                        <div key={reg._id} className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-md hover:border-gray-500 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">{reg.event.name}</h3>
                                    <p className="text-sm text-gray-400">{reg.event.location}</p>
                                </div>
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${new Date(reg.event.date) > now ? 'bg-green-500/20 text-green-300' : 'bg-gray-600/50 text-gray-400'}`}>
                                    {new Date(reg.event.date) > now ? 'Upcoming' : 'Completed'}
                                </span>
                            </div>

                            <div className="border-t border-gray-700 pt-4 mt-2 flex justify-between items-center text-sm">
                                <div className="text-gray-300">
                                    <span className="block text-xs text-gray-500 uppercase">Event Date</span>
                                    {new Date(reg.event.date).toLocaleDateString()}
                                </div>
                                <div className="text-right text-gray-300">
                                    <span className="block text-xs text-gray-500 uppercase">Registered On</span>
                                    {new Date(reg.registrationDate).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    if (loading) return (
        <div className="pt-20 min-h-screen bg-gray-900 flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="pt-24 min-h-screen bg-gray-900 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-end justify-between mb-8 border-b border-gray-800 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold">My Dashboard</h1>
                        <p className="text-gray-400 mt-2">Manage your event registrations and history.</p>
                    </div>
                    <Link to="/events" className="hidden sm:inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-colors">
                        Discover More
                    </Link>
                </div>

                <div className="pb-12">
                    <EventList
                        title="Upcoming Events"
                        items={upcomingEvents}
                        emptyMessage="You haven't registered for any upcoming events yet."
                    />

                    <EventList
                        title="Past Events"
                        items={pastEvents}
                        emptyMessage="No past event history found."
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
