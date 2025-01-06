import { FormEvent, useState } from "react";
import { Legend } from "../../app/table/Table.tsx";

interface AddTruckProps {
    setLegend: (updater: (prevLegend: Legend[]) => Legend[]) => void;
    setIsModalVisible: (value: boolean) => void;
}

function AddTruck({ setLegend, setIsModalVisible }: AddTruckProps) {
    const [truckNumber, setTruckNumber] = useState("");

    const handleLegendSubmit = (e: FormEvent) => {
        e.preventDefault();

        setLegend((prevLegend) => {
            return [
                ...prevLegend,
                {
                    number: truckNumber,
                    workLegend: []
                }
            ]
        });

        setIsModalVisible(false);
    };

    return (
        <form onSubmit={handleLegendSubmit} action="" method="POST">
            <h2 className="text-xl font-semibold text-center">Add Truck</h2>
            <div className="my-4 flex gap-4">
                <label htmlFor="">Truck number</label>
                <input value={truckNumber} onChange={e => setTruckNumber(e.currentTarget.value)} type="text"/>
            </div>
            <button type="submit" className="px-4 bg-blue-400 text-white block w-full">Add</button>
        </form>
    )
}

export default AddTruck;