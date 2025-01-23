import { ReactNode, useEffect, useRef } from "react";

interface ModalWindowProps {
    children: ReactNode;
    onModalVisible: (value: boolean) => void;
}

function ModalWindow({ onModalVisible, children }: ModalWindowProps)  {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onModalVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [onModalVisible, modalRef]);

    return (
        <div className="absolute w-full flex justify-center items-center top-1/2 z-10">
            <div ref={modalRef} className="min-w-72 border border-gray-300 p-4 bg-gray-100 rounded">
                {children}
            </div>
        </div>
    )
}

export default ModalWindow;
