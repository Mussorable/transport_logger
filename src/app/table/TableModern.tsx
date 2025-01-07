import rightArrow from '../../assets/right-arrow.svg';
import { ReactNode, useState } from "react";
import ModalWindow from "../../utils/ModalWindow.tsx";
// import AddTruck from "../../utils/modals/AddTruck.tsx";

import moment from "moment/min/moment-with-locales";
import AddRoute, { Route } from "./legend/AddRoute.tsx";
import { generateWeek } from "../../utils/utils.tsx";
import AddTruck from "../../utils/modals/AddTruck.tsx";

const browserLanguage= navigator.language;

export interface Legend {
    number: string;
    workLegend: Route[];
}

function TableModern() {
    moment.locale(browserLanguage);

    const week: string[] = generateWeek();
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<ReactNode>(null);
    const [legend, setLegend] = useState<Legend[]>([
        {
            number: "5E7 1856",
            workLegend: [
                {
                    date: moment().subtract(2, 'days').format("YYYY-MM-DD"),
                    deliveryTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
                    to: "TO CITY",
                    status: "DONE"
                },
                {
                    date: moment().subtract(1, 'days').format("YYYY-MM-DD"),
                    deliveryTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
                    to: "TO CITY",
                    status: "LOADING"
                },
                {
                    date: moment().format("YYYY-MM-DD"),
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
                    date: moment().subtract(2, 'days').format("YYYY-MM-DD"),
                    deliveryTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
                    to: "TO CITY",
                    status: "DONE"
                },
                {
                    date: moment().subtract(1, 'days').format("YYYY-MM-DD"),
                    deliveryTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
                    to: "TO CITY",
                    status: "UNLOADING"
                },
                {
                    date: moment().format("YYYY-MM-DD"),
                    deliveryTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
                    to: "TO CITY",
                    status: "LOADING"
                },
                {
                    date: moment().add(1, 'days').format("YYYY-MM-DD"),
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
                    date: moment().subtract(2, 'days').format("YYYY-MM-DD"),
                    deliveryTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
                    to: "TO CITY",
                    status: "DONE"
                },
                {
                    date: moment().subtract(1, 'days').format("YYYY-MM-DD"),
                    deliveryTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
                    to: "TO CITY",
                    status: "LOADING"
                },
                {
                    date: moment().format("YYYY-MM-DD"),
                    deliveryTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
                    to: "TO CITY",
                    status: "UNLOADING"
                },
                {
                    date: moment().add(2, 'days').format("YYYY-MM-DD"),
                    deliveryTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
                    to: "TO CITY",
                    status: "LOADING"
                }
            ]
        }
    ]);
    const [editingTruck, setEditingTruck] = useState<{ truckNumber: string; day: string } | null>(null);

    const handleAddRoute = (route: Route, truckNumber: string, day: string) => {
        setLegend((prevLegend) =>
            prevLegend.map((truck) =>
                truck.number === truckNumber
                    ? { ...truck, workLegend: [...truck.workLegend, route] }
                    : truck
            )
        );
        setEditingTruck({ truckNumber, day });
    };
    const handleCancelAddRoute = () => {
            setEditingTruck(null);
    };

    const handleAddTruckClick = () => {
        setModalContent(<AddTruck setLegend={setLegend} onModalVisible={setIsModalVisible} />);
        setIsModalVisible((prev) => !prev);
    };

    return (
        <>
            <div className="w-full h-full flex">
                <div className="bg-gray-800 w-1/2 overflow-y-scroll scrollbar-hide">
                    <div className="flex h-8 w-full border-b border-gray-600">
                        <div className="flex-1 text-white font-semibold text-center"><p>Truck</p></div>
                        { week.map((day) => {
                            return (
                                <div key={ day } className="flex">
                                    <div className="w-4 border-l border-gray-400 bg-gray-600"></div>
                                    <div className="border-l border-gray-400 w-24"><span
                                        className="text-white block text-center">{ moment(day).format('DD.MM ddd').toUpperCase() }</span>
                                    </div>
                                </div>
                            )
                        }) }
                    </div>
                    { legend && legend.map((truck) => {
                        return (
                            <div key={ truck.number }
                                 className="flex w-fullbg-gray-900 font-semibold border-b border-gray-400">
                                <div className="flex-1 text-white px-2 bg-gray-700 overflow-x-hidden">
                                    <p>{ truck.number.toUpperCase() }</p>
                                </div>
                                { week.map((day) => {
                                    const hasRoute = truck.workLegend.some((route) => route.date === day);

                                    return (
                                        <div key={ day } className="flex">
                                            <div
                                                className="w-4 border-l border-gray-400 bg-gray-600 flex justify-center align-middle">
                                                <img src={ rightArrow } alt=""/>
                                            </div>
                                            <div className="border-l border-gray-400 w-24 bg-gray-700">
                                                { truck.workLegend && truck.workLegend.map((route, index) => {
                                                    if (route.date === day) {
                                                        return (
                                                            <div key={ index } className="flex">
                                                                <div
                                                                    className={ `text-sm font-light px-2 w-full overflow-x-hidden ${ route.status === 'DONE' ? 'bg-gray-600 text-gray-900' : route.status === 'LOADING' ? 'bg-green-300' : 'bg-blue-300' }` }>
                                                                    <p>{ moment(route.date).format("DD.MM ddd").toUpperCase() }</p>
                                                                    <p>{ `${ route.to[0].toUpperCase() }${ route.to.slice(1).toLowerCase() }` }</p>
                                                                    <p>{ route.deliveryTime }</p>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                }) }
                                                { !hasRoute && (
                                                    editingTruck?.truckNumber === truck.number && editingTruck.day === day ?
                                                        (
                                                            <AddRoute
                                                                key={ `${ truck.number }-${ day }` }
                                                                day={ day }
                                                                truckNumber={ truck.number }
                                                                onRouteAdded={ handleAddRoute }
                                                                onCancel={ handleCancelAddRoute }
                                                            />
                                                        ) :
                                                        (
                                                            <button
                                                                key={ `${ truck.number }-${ day }` }
                                                                className="bg-gray-700 hover:bg-gray-600 w-full h-full px-5 font-normal text-sm"
                                                                onClick={ () => setEditingTruck({
                                                                    truckNumber: truck.number,
                                                                    day
                                                                }) }>Add</button>
                                                        )
                                                ) }
                                            </div>
                                        </div>
                                    )
                                }) }
                            </div>
                        )
                    }) }
                    <div className="bg-gray-900 border-b border-gray-400 relative">
                        <button onClick={ handleAddTruckClick } className="w-full bg-gray-300 hover:bg-gray-200">New truck</button>
                    </div>
                </div>
                <div className="bg-green-300 h-full w-1/2"></div>
            </div>
            { isModalVisible && <ModalWindow onModalVisible={setIsModalVisible} children={ modalContent }/> }
        </>
    )
}

export default TableModern;