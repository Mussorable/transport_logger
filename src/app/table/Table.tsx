import rightArrow from '../../assets/right-arrow.svg';
import { ReactNode, useState } from "react";
import ModalWindow from "../../utils/ModalWindow.tsx";
import AddTruck from "../../utils/modals/AddTruck.tsx";

import moment from "moment/min/moment-with-locales";
import AddRoute, { Route } from "./legend/AddRoute.tsx";
import { generateWeek } from "../../utils/utils.tsx";

const browserLanguage= navigator.language;

export interface Legend {
    number: string;
    workLegend: Route[];
}

function Table() {
    moment.locale(browserLanguage);

    const week: string[] = generateWeek();
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<ReactNode>(null);
    const [legend, setLegend] = useState<Legend[]>([
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
    const [editingTruck, setEditingTruck] = useState<string | null>(null);

    const handleAddRoute = (route: Route, truckNumber: string) => {
        setLegend((prevLegend) =>
            prevLegend.map((truck) =>
                truck.number === truckNumber
                    ? { ...truck, workLegend: [...truck.workLegend, route] }
                    : truck
            )
        );
        setEditingTruck(truckNumber);
    };
    const handleCancelAddRoute = () => {
        setEditingTruck(null);
    };

    const handleAddTruckClick = () => {
        setModalContent(<AddTruck setLegend={setLegend} setIsModalVisible={setIsModalVisible} />);
        setIsModalVisible((prev) => !prev);
    };

    return (
        <div className="w-full h-full">
            { isModalVisible && <ModalWindow children={modalContent} /> }
            <div className="flex bg-gray-800 h-8 w-full">
                <div className="w-32"></div>
                { week.map((day) => {
                    return (
                        <div key={ day } className="flex">
                            <div className="border-x border-gray-400 w-24"><span className="text-white block text-center">{ day }</span></div>
                            <div className="w-4 bg-gray-600"></div>
                        </div>
                )
                }) }
            </div>
            { legend && legend.map((truck) => {
                return (
                    <div key={ truck.number} className="flex bg-gray-900 font-semibold border-b border-gray-400">
                        <div className="text-white px-2 bg-gray-700 w-32">
                            <p>{truck.number.toUpperCase()}</p>
                        </div>
                        <div className="flex-1 flex">
                            {truck.workLegend && truck.workLegend.map((route, index) => {
                                return (
                                    <div key={index} className="flex">
                                        <div
                                             className={ `text-sm font-light border-x px-2 w-24 overflow-x-hidden ${ route.status === 'DONE' ? 'bg-gray-400' : route.status === 'LOADING' ? 'bg-green-300' : 'bg-blue-300' }` }>
                                            <p>{ moment(route.date).format("DD.MM ddd").toUpperCase() }</p>
                                            <p>{ `${route.to[0].toUpperCase()}${route.to.slice(1).toLowerCase()}` }</p>
                                            <p>{ route.deliveryTime }</p>
                                        </div>
                                        <div className="w-4 bg-gray-600 flex justify-center align-middle"><img
                                            src={ rightArrow } alt=""/></div>
                                    </div>
                                )
                            }) }
                            <div className="text-sm font-light border-x relative">
                                { editingTruck === truck.number ?
                                    (
                                        <AddRoute
                                            truckNumber={truck.number}
                                            onRouteAdded={handleAddRoute}
                                            onCancel={handleCancelAddRoute}
                                        />
                                    ) :
                                    (
                                    <button className="bg-cyan-200 w-full h-full px-5 font-semibold"
                                            onClick={ () => setEditingTruck(truck.number) }>Add</button>
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