import { useEffect } from "react";
import { FetchWrapper } from "../../utils/FetchWrapper.tsx";
import { ServerResponse } from "./AppInitializer.tsx";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../utils/NotificationContext.tsx";
import { useAuth } from "./AuthProvider.tsx";

function Logout() {
    const fetchWrapper = new FetchWrapper('/auth');
    const { addNotification } = useNotification();
    const { setAuthenticated, setIsLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);

        fetchWrapper.post<ServerResponse>('/logout', {})
            .then((response) => {
                const { status, message } = response;
                addNotification(status, message);
            })
            .catch(() => addNotification('error', 'Error while logging out'))
            .finally(() => {
                setAuthenticated(false);
                setIsLoading(false);
                navigate('/auth/login');
            });

    }, [fetchWrapper, navigate, addNotification]);

    return null;
}

export default Logout;