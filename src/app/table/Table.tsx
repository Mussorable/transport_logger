import rightArrow from '../../assets/right-arrow.svg';
import React, { ChangeEvent, FormEvent, ReactNode, useState } from "react";
import ModalWindow from "../../utils/ModalWindow.tsx";
import AddTruck from "../../utils/modals/AddTruck.tsx";

import moment from "moment/min/moment-with-locales";

const browserLanguage= navigator.language;

function Table() {
    moment.locale(browserLanguage);

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<ReactNode>(null);
    const [legend, setLegend] = useState([
        {
            number: "5E7 1856",
            workLegend: [
                {
                    date: new Date().getDay().toString(),
                    deliveryTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
                    to: "TO CITY",
                    status: "DONE"
                },
                {
                    date: new Date().getDay().toString(),
                    deliveryTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
                    to: "TO CITY",
                    status: "LOADING"
                },
                {
                    date: new Date().getDay().toString(),
                    deliveryTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
                    to: "TO CITY",
                    status: "FUTURE"
                }
            ]
        },
        {
            number: "5E4 1984",
            workLegend: [
                {
                    date: new Date().getDay().toString(),
                    deliveryTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
                    to: "TO CITY",
                    status: "DONE"
                },
                {
                    date: new Date().getDay().toString(),
                    deliveryTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
                    to: "TO CITY",
                    status: "UNLOADING"
                },
                {
                    date: new Date().getDay().toString(),
                    deliveryTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
                    to: "TO CITY",
                    status: "LOADING"
                }
            ]
        },
        {
            number: "6E8 3847",
            workLegend: [
                {
                    date: new Date().getDay().toString(),
                    deliveryTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
                    to: "TO CITY",
                    status: "DONE"
                },
                {
                    date: new Date().getDay().toString(),
                    deliveryTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
                    to: "TO CITY",
                    status: "LOADING"
                },
                {
                    date: new Date().getDay().toString(),
                    deliveryTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
                    to: "TO CITY",
                    status: "UNLOADING"
                }
            ]
        }
    ]);
    const [newLegend, setNewLegend] = useState({
        date: "",
        deliveryTime: "",
        to: "",
        status: ""
    });
    const [editingLegends, setEditingLegends] = useState<string | null>(null);

    const handleAddLegendClick = (truckNumber: string) => {
        setEditingLegends(truckNumber);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'deliveryTime') {
            const formattedTime = moment(value, 'HH:mm', true).format('HH:mm');
            setNewLegend((prev) => ({ ...prev, [name]: formattedTime }));
        }
        setNewLegend((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmitLegend = (event: FormEvent, truckNumber: string) => {
        event.preventDefault();

        const { date, deliveryTime, to, status } = newLegend;
        if (to) {
            const updatedLegend = {
                ...newLegend,
                date: date || moment().format("YYYY-MM-DD"),
                deliveryTime: deliveryTime || moment().format("HH:mm"),
                status: status || "LOADING"
            };

            setLegend((prevLegend) =>
                prevLegend.map((truck) =>
                    truck.number === truckNumber
                        ? {...truck, workLegend: [...truck.workLegend, {...updatedLegend}]}
                        : truck
                )
            );
            console.log(updatedLegend);
        }
        setEditingLegends(null);
        setNewLegend({
            date: "",
            deliveryTime: "",
            to: "",
            status: ""
        });
    };
    const handleEscPress = (event: React.KeyboardEvent<HTMLFormElement>) => {
        if (event.key === "Escape") {
            setEditingLegends(null);
            setNewLegend({
                date: "",
                deliveryTime: "",
                to: "",
                status: ""
            });
        }
    };

    const handleAddTruckClick = () => {
        setModalContent(<AddTruck />);
        setIsModalVisible((prev) => !prev);
    };

    return (
        <div className="w-full h-full">
            { isModalVisible && <ModalWindow children={modalContent} /> }
            { legend && legend.map((truck) => {
                return (
                    <div key={truck.number} className="flex bg-gray-900 font-semibold border-b border-gray-400">
                        <div className="text-white px-2 bg-gray-700 w-32">
                            <p>{truck.number}</p>
                        </div>
                        <div className="flex-1 flex">
                            {truck.workLegend && truck.workLegend.map((route, index) => {
                                return (
                                    <div key={index} className="flex">
                                        <div
                                             className={ `text-sm font-light border-x px-2 ${ route.status === 'DONE' ? 'bg-gray-400' : route.status === 'LOADING' ? 'bg-green-300' : 'bg-blue-300' }` }>
                                            <p>{ moment(route.date).format("DD.MM dddd") }</p>
                                            <p>{ `${route.to[0].toUpperCase()}${route.to.slice(1).toLowerCase()}` }</p>
                                            <p>{ route.deliveryTime }</p>
                                        </div>
                                        <div className="w-6 bg-gray-600 flex justify-center align-middle"><img
                                            src={ rightArrow } alt=""/></div>
                                    </div>
                                )
                            }) }
                            <div className="text-sm font-light border-x relative">
                                { editingLegends === truck.number ?
                                    (
                                        <form
                                            onSubmit={(e) => handleSubmitLegend(e, truck.number)}
                                            onKeyDown={e => handleEscPress(e)}
                                            className="flex flex-col">
                                            <input className="w-24" required={true} name="date" onChange={handleInputChange} value={newLegend.date || moment().format("YYYY-MM-DD")} type={"date"}/>
                                            <input className="w-24" required={true} name="to" placeholder="Place" onChange={handleInputChange} value={newLegend.to} type="text"/>
                                            <input className="w-24" required={true} name="deliveryTime" placeholder="HH:MM" onChange={handleInputChange} value={newLegend.deliveryTime || moment().format("HH:mm")} type="text"/>
                                            <select className={ `w-24 ${newLegend.status === 'LOADING' ? 'bg-green-300' : newLegend.status === 'UNLOADING' ? 'bg-blue-300' : 'bg-red-300'}` } required={true} name="status" id="" value={newLegend.status} onChange={handleInputChange}>
                                                <option value=""></option>
                                                <option className="bg-green-300" value="LOADING">Loading</option>
                                                <option className="bg-blue-300" value="UNLOADING">Unloading</option>
                                            </select>
                                            <button type="submit" className="hidden">submit</button>
                                        </form>
                                    ) :
                                    (
                                    <button className="bg-cyan-200 w-full h-full px-5 font-semibold"
                                            onClick={ () => handleAddLegendClick(truck.number) }>Add</button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )
            }) }
            <div className="bg-gray-900 border-b border-gray-400 relative">
                <button onClick={handleAddTruckClick} className="w-full bg-cyan-200">New truck</button>
            </div>
        </div>
    )
}

export default Table;