import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    setAuthenticated: (value: boolean) => void;
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuthenticated, isLoading, setIsLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}