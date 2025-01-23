import { ChangeEvent, FormEvent, useState } from "react";
import { Legend } from "../../app/table/TableModern.tsx";
import { FetchWrapper } from "../FetchWrapper.tsx";

interface AddTruckProps {
    setLegend: (updater: (prevLegend: Legend[]) => Legend[]) => void;
    onModalVisible: (value: boolean) => void;
}

function AddTruck({ setLegend, onModalVisible }: AddTruckProps) {
    const fetchWrapper = new FetchWrapper('/trucks');
    const [truckNumber, setTruckNumber] = useState<string>("");
    const [isError, setIsError] = useState<{ flag: boolean; message?: string }>({ flag: false });

    const handleLegendSubmit = (e: FormEvent) => {
        e.preventDefault();

        const regex = /^[A-Za-z0-9\s]{6,8}$/;

        if (regex.test(truckNumber)) {
            fetchWrapper.post<Legend>('/add', { truckNumber })
                .then((newTruck) => {
                    setLegend((oldLegend) => {
                       return [
                           ...oldLegend,
                           newTruck
                       ]
                    });
                    onModalVisible(false);
                });
        }
    };
    const handleTruckNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value.toUpperCase();
        const cleanedValue = value.trim().replace(/\s{2,}/g, ' ');
        const regex = /^[A-Za-z0-9\s]{6,8}$/;

        setTruckNumber(value);

        if (cleanedValue.length < 6 || cleanedValue.length > 8) {
            setIsError({
                flag: true,
                message: "Truck number must be 6-8 characters long (excluding spaces)",
            });
        } else if (!regex.test(value)) {
            setIsError({
                flag: true,
                message: "Truck number can only include letters, numbers, and spaces",
            });
        } else {
            setIsError({ flag: false });
        }
    };

    return (
        <form onSubmit={handleLegendSubmit} action="" method="POST">
            <h2 className="text-xl font-semibold text-center">Add Truck</h2>
            <div className="mt-4 flex gap-4">
                <label htmlFor="">Truck number</label>
                <input required={true} value={truckNumber} onChange={handleTruckNumberChange} type="text" className={`border-2 px-2 rounded ${isError.flag ? 'border-red-500 focus:border-red-500' : ''} focus:outline-none focus:border-blue-400`}/>
            </div>
            { isError.flag && isError.message && <p className="text-red-500 italic text-sm">Number must be 6-8 characters long</p> }
            <button type="submit" className="px-4 bg-blue-400 text-white block w-full mt-4">Add</button>
        </form>
    )
}

export default AddTruck;