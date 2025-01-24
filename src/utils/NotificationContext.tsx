import { createContext, ReactNode, useContext, useState } from "react";

type Notification = {
    id: number;
    status: 'success' | 'error' | 'warning';
    message: string;
};

type NotificationContextType = {
    notifications: Notification[];
    addNotification: (status: Notification["status"], message: string) => void;
    removeNotification: (id: number) => void;
};

interface NotificationProviderProps {
    children: ReactNode;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const removeNotification = (id: number): void => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    };
    const addNotification = (status: Notification['status'], message: string) => {
        const id = Date.now();
        setNotifications((prev) => [...prev, { id, status, message }]);

        setTimeout(() => removeNotification(id), 5000);
    };

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) throw new Error("useNotification must be used within a NotificationProvider");
    return context;
};