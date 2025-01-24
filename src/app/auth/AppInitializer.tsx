import { useEffect } from "react";
import { useAuth } from "./AuthProvider.tsx";
import { FetchWrapper } from "../../utils/FetchWrapper.tsx";
import { useNotification } from "../../utils/NotificationContext.tsx";

interface ServerError {
    message: string;
}

export interface ServerResponse {
    status: 'success' | 'error' | 'warning';
    message: string;
    errors?: ServerError[];
}

const AppInitializer = () => {
    const fetchWrapper = new FetchWrapper('/trucks');
    const { setAuthenticated, setIsLoading } = useAuth();
    const { addNotification } = useNotification();

    useEffect(() => {
        fetchWrapper.get<ServerResponse>('/validation')
            .then((response) => {
                const { status, message } = response;
                setAuthenticated(response.status === 'success');
                addNotification(status, message);
            })
            .catch(() => setAuthenticated(false))
            .finally(() => setIsLoading(false));
    }, []);

    return null;
};

export default AppInitializer;
