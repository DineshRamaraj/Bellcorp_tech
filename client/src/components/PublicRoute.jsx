import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PublicRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        // You can replace this with a proper loading spinner component
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#FAFAF9]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-900"></div>
            </div>
        );
    }

    // If user is authenticated, redirect to events or dashboard
    return user ? <Navigate to="/events" replace /> : children;
};

export default PublicRoute;
