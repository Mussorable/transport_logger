import moment from "moment";
import { ChangeEvent, FormEvent, KeyboardEvent, useState, FocusEvent } from "react";

interface AddRouteProps {
    truckNumber: string;
    onRouteAdded: (route: Route, truckNumber: string, day: string) => void;
    day: string;
    onCancel: () => void;
}
export interface Route {
    date: string;
    deliveryTime: string;
    to: string;
    status: string;
}

function AddRoute({ truckNumber, onRouteAdded, day, onCancel }: AddRouteProps) {
    const [newRoute, setNewRoute] = useState<Route>({
        date: day,
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
        onRouteAdded(newRoute, truckNumber, day);
    };
    const handleEscPress = (e: KeyboardEvent) => {
        if (e.key === "Escape") onCancel();
    };
    const handleFormBlur = (e: FocusEvent<HTMLFormElement>) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            onCancel();
        }
    };

    return (
        <form
            onBlur={handleFormBlur}
            onSubmit={handleSubmit}
            onKeyDown={handleEscPress}
            className="flex flex-col">
            <input autoFocus={true} className="w-full text-[12px]" required={ true } name="date" onChange={ handleInputChange }
                   value={ newRoute.date || moment().format("YYYY-MM-DD") } type={ "date" }/>
            <div className="flex">
                <input className="w-full text-sm py-0 my-0" required={ true } name="to" placeholder="Place"
                       onChange={ handleInputChange }
                       value={ newRoute.to } type="text"/>
                <input className="w-full text-sm py-0 my-0" required={ true } name="deliveryTime" placeholder="HH:MM"
                       onChange={ handleInputChange } value={ newRoute.deliveryTime || moment().format("HH:mm") }
                       type="text"/>
            </div>
            <select
                className={ `w-full h-full text-[13.5px] ${ newRoute.status === 'LOADING' ? 'bg-green-300' : newRoute.status === 'UNLOADING' ? 'bg-blue-300' : 'bg-red-300' }` }
                required={ true } name="status" id="" value={ newRoute.status } onChange={ handleInputChange }>
                <option className="bg-green-300" value="LOADING">Loading</option>
                <option className="bg-blue-300" value="UNLOADING">Unloading</option>
            </select>
            <button type="submit" className="hidden">submit</button>
        </form>
    )
}

export default AddRoute;