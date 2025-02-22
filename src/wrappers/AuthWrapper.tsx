import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../app/auth/AuthProvider.tsx";

function AuthWrapper() {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to={'/'} />;
    }

    return (
        <div className="flex items-center justify-between h-full w-full">
            <div className="mx-auto max-w-2xl min-w-[420px] rounded-xl border-[1px] border-gray-200 bg-gray-700 px-4 py-6 text-white">
                <Outlet />
            </div>
        </div>
    )
}

export default AuthWrapper;