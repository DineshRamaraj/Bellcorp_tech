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
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:5000/api/events/${id}/register`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage('Registration successful!');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Registration failed');
        }
    };

    if (!event) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white rounded shadow-md p-6">
                <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
                <p className="text-gray-600 mb-2">{new Date(event.date).toLocaleString()}</p>
                <p className="text-gray-600 mb-4">{event.location}</p>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Description</h3>
                    <p>{event.description}</p>
                </div>

                <div className="mb-6">
                    <p><strong>Category:</strong> {event.category}</p>
                    <p><strong>Organizer:</strong> {event.organizer}</p>
                    <p><strong>Capacity:</strong> {event.capacity}</p>
                </div>

                {message && <p className={`mb-4 ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}

                <button
                    onClick={handleRegister}
                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                >
                    {user ? 'Register Now' : 'Login to Register'}
                </button>
            </div>
        </div>
    );
};

export default EventDetails;
