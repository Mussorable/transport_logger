import { ChangeEvent, FormEvent, useState } from "react";
import { Legend } from "../../app/table/TableModern.tsx";

interface AddTruckProps {
    setLegend: (updater: (prevLegend: Legend[]) => Legend[]) => void;
    onModalVisible: (value: boolean) => void;
}

function AddTruck({ setLegend, onModalVisible }: AddTruckProps) {
    const serverUrl = import.meta.env.VITE_SERVER_URL + import.meta.env.VITE_SERVER_PORT + '/trucks';
    const [truckNumber, setTruckNumber] = useState("");
    const [isError, setIsError] = useState<{ flag: boolean; message?: string }>({ flag: false });

    const handleLegendSubmit = (e: FormEvent) => {
        e.preventDefault();

        const currentTruckNumber = truckNumber.replace(/\s+/g, '');
        const regex = /^[A-Za-z0-9]{6,8}$/;

        if (regex.test(currentTruckNumber)) {
            setLegend((prevLegend) => {
                return [
                    ...prevLegend,
                    {
                        number: truckNumber,
                        workLegend: []
                    }
                ]
            });

            // fetch(serverUrl + '/add', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({ truckNumber }),
            //     credentials: "include",
            // })
            //     .then(res => {
            //         if (res.status === 200) {
            //             // window.location.reload();
            //             // return;
            //         }
            //         return res.json();
            //     })
            //     .then(data => {
            //         if (data?.errors) console.error(data.errors);
            //     });

            fetch(serverUrl + '/get-all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
            }).then(res => res.json()).then(data => console.log(data));

            onModalVisible(false);
        }
    };
    const handleTruckNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value.replace(/\s+/g, '');
        const regex = /^[A-Za-z0-9]{6,8}$/;

        setTruckNumber(value);
        if (!regex.test(value)) {
            setIsError({ flag: true, message: "Truck number must be 6-8 characters long" });
        } else {
            setIsError({ flag: false });
        }
    }

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