import { useNotification } from "./NotificationContext";

function NotificationWindow() {
    const { notifications } = useNotification();

    return (
        <div className="fixed inset-0 z-20 pointer-events-none flex justify-end items-end">
            <div className="mr-8 mb-8">
                {notifications.map(({ id, status, message }, index) => (
                    <div
                        key={`${id}-${index}`}
                        className={`items-center px-6 py-2 justify-between shadow-lg rounded-lg pointer-events-auto border-2 ${
                            status === "warning"
                                ? "bg-orange-300 border-orange-400"
                                : status === "error"
                                    ? "bg-red-400 border-red-500"
                                    : "bg-blue-400 border-blue-500"
                        }`}
                    >
                        <span>{message}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NotificationWindow;
