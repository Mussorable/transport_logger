import moment from "moment";
import { ChangeEvent, FormEvent, KeyboardEvent, useState, FocusEvent } from "react";
import { generateTimeFormat } from "../../../utils/utils.tsx";
import { EditingTruck } from "../TableModern.tsx";

interface AddRouteProps {
    editingTruck: EditingTruck;
    onRouteAdded: (route: Route, certainLegend: EditingTruck) => void;
    onCancel: () => void;
    existedRoute?: Route;
}
export interface Route {
    id: string;
    date: string;
    deliveryTime: string;
    to: string;
    status: string;
    [key: string]: unknown;
}

function AddRoute({ editingTruck, onRouteAdded, onCancel, existedRoute }: AddRouteProps) {
    const [newRoute, setNewRoute] = useState<Route>(existedRoute ? existedRoute : {
        id: '',
        date: editingTruck.day,
        deliveryTime: generateTimeFormat(moment().format("HH:mm")),
        to: "",
        status: "LOADING"
    });

    const validateCity = (city: string) => {
        const regex = /^[A-Za-z\s-]{0,16}$/;
        if (city.length > 10) return city.slice(0, 16);
        return regex.test(city) ? city : '';
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewRoute((prev) => {
            return {
                ...prev,
                [name]: name === "deliveryTime" ? generateTimeFormat(value) :
                    name === "to" ? validateCity(value) : value,
            }
        });
    };
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        onRouteAdded(newRoute, editingTruck);
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
            className="flex flex-col border-2 border-red-500 max-w-full">
            <input autoFocus={true} className="w-full text-[12px] outline-none" required={ true } name="date" onChange={ handleInputChange }
                   value={ newRoute.date || moment().format("YYYY-MM-DD") } type={ "date" }/>
            <div className="flex">
                <input className="w-full text-sm py-0 my-0 outline-none" required={ true } name="to" placeholder="Place"
                       onChange={ handleInputChange }
                       value={ newRoute.to } type="text"/>
                <input
                       onFocus={e => e.currentTarget.setSelectionRange(0, newRoute.deliveryTime.length)}
                       className="w-full text-sm py-0 my-0 outline-none" required={ true } name="deliveryTime" placeholder="HH:MM"
                       onChange={ handleInputChange } value={ newRoute.deliveryTime }
                       type="text"/>
            </div>
            <select
                className={ `w-full h-full text-[10.5px] outline-none ${ newRoute.status === 'LOADING' ? 'bg-green-300' : newRoute.status === 'UNLOADING' ? 'bg-blue-300' : 'bg-red-300' }` }
                required={ true } name="status" id="" value={ newRoute.status } onChange={ handleInputChange }>
                <option className="bg-green-300" value="LOADING">Loading</option>
                <option className="bg-blue-300" value="UNLOADING">Unloading</option>
            </select>
            <button type="submit" className="hidden">submit</button>
        </form>
    )
}

export default AddRoute;