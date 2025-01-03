import { Outlet } from "react-router-dom";

function Background() {
    return (
        <div className="bg-gray-800 w-full h-screen">
            <Outlet />
        </div>
    )
}

export default Background;