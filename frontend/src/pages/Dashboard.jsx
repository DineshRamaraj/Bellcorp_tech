import { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [registrations, setRegistrations] = useState([]);

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
            }
        };
        fetchRegistrations();
    }, []);

    const now = new Date();
    const upcomingEvents = registrations.filter(r => new Date(r.event.date) > now);
    const pastEvents = registrations.filter(r => new Date(r.event.date) <= now);

    const EventList = ({ title, items }) => (
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            {items.length === 0 ? (
                <p>No events found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map(reg => (
                        <div key={reg._id} className="bg-white rounded shadow-md p-4">
                            <h3 className="text-xl font-bold mb-2">{reg.event.name}</h3>
                            <p className="text-gray-600 mb-1">{new Date(reg.event.date).toLocaleDateString()}</p>
                            <p className="text-gray-600 mb-1">{reg.event.location}</p>
                            <p className="text-sm text-gray-500 mt-2">Registered on: {new Date(reg.registrationDate).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>
            <EventList title="Upcoming Events" items={upcomingEvents} />
            <EventList title="Past Events" items={pastEvents} />
        </div>
    );
};

export default Dashboard;
