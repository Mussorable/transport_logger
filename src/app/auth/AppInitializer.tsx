import { useEffect } from "react";
import { useAuth } from "./AuthProvider.tsx";

const AppInitializer = () => {
    const serverUrl = import.meta.env.VITE_SERVER_URL + import.meta.env.VITE_SERVER_PORT + '/trucks';
    const { setAuthenticated, setIsLoading } = useAuth();

    useEffect(() => {
        fetch(serverUrl + "/validation", { credentials: "include" })
            .then((res) => {
                if (res.ok) {
                    setAuthenticated(true);
                } else {
                    setAuthenticated(false);
                }
            })
            .catch(() => setAuthenticated(false))
            .finally(() => setIsLoading(false));
    }, [setAuthenticated]);

    return null;
};

export default AppInitializer;
