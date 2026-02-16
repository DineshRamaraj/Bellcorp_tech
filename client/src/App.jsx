import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import EventDiscovery from './pages/EventDiscovery';
import EventDetails from './pages/EventDetails';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact';

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
                        <Route path="/login" element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        } />
                        <Route path="/register" element={
                            <PublicRoute>
                                <Register />
                            </PublicRoute>
                        } />
                        <Route path="/dashboard" element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        } />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
