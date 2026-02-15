import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import EventDiscovery from './pages/EventDiscovery';
import EventDetails from './pages/EventDetails';
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="min-h-screen bg-transparent">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<EventDiscovery />} />
                        <Route path="/events" element={<EventDiscovery />} />
                        <Route path="/events/:id" element={<EventDetails />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        } />
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
