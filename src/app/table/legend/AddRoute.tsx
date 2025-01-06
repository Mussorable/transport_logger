import moment from "moment";
import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";

interface AddRouteProps {
    truckNumber: string;
    onRouteAdded: (route: Route, truckNumber: string) => void;
    onCancel: () => void;
}
export interface Route {
    date: string;
    deliveryTime: string;
    to: string;
    status: string;
}

function AddRoute({ truckNumber, onRouteAdded, onCancel }: AddRouteProps) {
    const [newRoute, setNewRoute] = useState<Route>({
        date: moment().format("YYYY-MM-DD"),
        deliveryTime: moment().format("HH:mm"),
        to: "",
        status: "LOADING",
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewRoute((prev) => ({
            ...prev,
            [name]: name === "deliveryTime" ? moment(value, "HH:mm", true).format("HH:mm") : value,
        }));
    };
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onRouteAdded(newRoute, truckNumber);
    };
    const handleEscPress = (e: KeyboardEvent) => {
        if (e.key === "Escape") onCancel();
    };

    return (
        <form
            onBlur={onCancel}
            onSubmit={handleSubmit}
            onKeyDown={handleEscPress}
            className="flex flex-col">
            <input autoFocus={true} className="w-24" required={ true } name="date" onChange={ handleInputChange }
                   value={ newRoute.date || moment().format("YYYY-MM-DD") } type={ "date" }/>
            <input className="w-24" required={ true } name="to" placeholder="Place" onChange={ handleInputChange }
                   value={ newRoute.to } type="text"/>
            <input className="w-24" required={ true } name="deliveryTime" placeholder="HH:MM"
                   onChange={ handleInputChange } value={ newRoute.deliveryTime || moment().format("HH:mm") }
                   type="text"/>
            <select
                className={ `w-24 ${ newRoute.status === 'LOADING' ? 'bg-green-300' : newRoute.status === 'UNLOADING' ? 'bg-blue-300' : 'bg-red-300' }` }
                required={ true } name="status" id="" value={ newRoute.status } onChange={ handleInputChange }>
                <option className="bg-green-300" value="LOADING">Loading</option>
                <option className="bg-blue-300" value="UNLOADING">Unloading</option>
            </select>
            <button type="submit" className="hidden">submit</button>
        </form>
    )
}

export default AddRoute;