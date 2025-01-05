import { ReactNode } from "react";

interface ModalWindowProps {
    children: ReactNode;
}

function ModalWindow({ children }: ModalWindowProps)  {
    return (
        <div className="absolute w-full flex justify-center items-center top-1/2">
            <div className="min-w-72 border border-gray-300 p-4 bg-gray-100 rounded">
                {children}
            </div>
        </div>
    )
}

export default ModalWindow;
