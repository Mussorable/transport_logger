import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider.tsx";

interface ProtectedRouteProps {
    children: ReactNode;
    redirectTo?: string;
}

function ProtectedRoute({ children, redirectTo="/auth/login" }: ProtectedRouteProps) {
    const { isAuthenticated, isLoading } = useAuth();

    if (!isAuthenticated && !isLoading) {
        return <Navigate to={redirectTo} replace />;
    }
    if (isAuthenticated && !isLoading)
        return children;
}

export default ProtectedRoute;