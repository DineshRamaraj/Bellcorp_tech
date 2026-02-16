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
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/events/my/registrations`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setRegistrations(Array.isArray(res.data) ? res.data : []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchRegistrations();
    }, []);

    const now = new Date();
    // Filter registrations, handling potential null events (e.g. deleted events)
    const upcomingEvents = registrations.filter(r => r.event && new Date(r.event.date) > now);
    const pastEvents = registrations.filter(r => r.event && new Date(r.event.date) <= now);

    const EventList = ({ title, items, emptyMessage }) => (
        <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 flex items-center text-slate-900">
                {title}
                <span className="ml-4 text-sm font-bold text-slate-500 bg-stone-100 px-3 py-1.5 rounded-full border border-stone-200">
                    {items.length}
                </span>
            </h2>

            {items.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-stone-200 rounded-3xl p-12 text-center">
                    <p className="text-slate-400 text-lg mb-4">{emptyMessage}</p>
                    <Link to="/events" className="text-blue-600 hover:text-blue-700 font-bold hover:underline underline-offset-4">Browse Events</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map(reg => (
                        <div key={reg._id} className="bg-white rounded-3xl p-6 border border-stone-100 shadow-[0_10px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all hover:border-blue-100 group">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{reg.event.name}</h3>
                                    <p className="text-sm text-slate-500 font-medium">{reg.event.location}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${new Date(reg.event.date) > now ? 'bg-green-50 text-green-600 border-green-100' : 'bg-stone-100 text-stone-500 border-stone-200'}`}>
                                    {new Date(reg.event.date) > now ? 'Upcoming' : 'Completed'}
                                </span>
                            </div>

                            <div className="border-t border-stone-100 pt-5 mt-2 flex justify-between items-center text-sm">
                                <div className="text-slate-600">
                                    <span className="block text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Event Date</span>
                                    <span className="font-semibold bg-stone-50 px-2 py-1 rounded-md">{new Date(reg.event.date).toLocaleDateString()}</span>
                                </div>
                                <div className="text-right text-slate-600">
                                    <span className="block text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Registered On</span>
                                    <span className="font-medium">{new Date(reg.registrationDate).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    if (loading) return (
        <div className="pt-20 min-h-screen bg-[#FAFAF9] flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="pt-24 min-h-screen bg-[#FAFAF9] text-slate-800">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-stone-200 pb-8 gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">My Dashboard</h1>
                        <p className="text-slate-500 mt-2 text-lg font-light">Manage your event registrations and history.</p>
                    </div>
                    <Link to="/events" className="inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl shadow-slate-900/10">
                        Discover More
                    </Link>
                </div>

                <div className="pb-20">
                    <EventList
                        title="Your Tickets"
                        items={upcomingEvents}
                        emptyMessage="You haven't reserved any upcoming events yet."
                    />

                    <EventList
                        title="History"
                        items={pastEvents}
                        emptyMessage="No past event history found."
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
