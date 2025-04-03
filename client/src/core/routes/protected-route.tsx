import type React from "react";
import { Navigate, useLocation } from "react-router";

import Loader from "@/core/components/loading-snipper";
import { useAuth } from "@/core/context/auth-context";

/*
    Component to protect routes by checking user authentication status.
    If the user is not authenticated, it redirects them to the login page,
    preserving the original location to redirect back after login.
*/

interface ProtectedRouteProps {
    children: React.ReactNode;
}


const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <Loader />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/users/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;