import rightArrow from '../../assets/right-arrow.svg';
import { ReactNode, useState } from "react";
import ModalWindow from "../../utils/ModalWindow.tsx";
import moment from "moment/min/moment-with-locales";
import AddRoute, { Route } from "./legend/AddRoute.tsx";
import { generateWeek } from "../../utils/utils.tsx";
import AddTruck from "../../utils/modals/AddTruck.tsx";

const browserLanguage= navigator.language;

export interface Legend {
    number: string;
    workLegend: Route[];
}
export interface EditingTruck {
    truckNumber: string;
    day: string;
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
    const [editingTruck, setEditingTruck] = useState<EditingTruck | null>(null);

    const handleAddRoute = (route: Route, certainLegend: EditingTruck) => {
        const { truckNumber } = certainLegend;
        setLegend((prevLegend) =>
            prevLegend.map((truck) => {
                    if (truck.number === truckNumber) {
                        const isRouteExist = truck.workLegend.some((existingRoute) => existingRoute.date === route.date);

                        // If route already exists just update fields, otherwise add new legend
                        const updatedLegend = isRouteExist
                            ? truck.workLegend.map((existingRoute) =>
                                    existingRoute.date === route.date
                                        ? { ...existingRoute, ...route }
                                        : existingRoute
                            ) : [...truck.workLegend, route];
                        return { ...truck, workLegend: updatedLegend };
                    }
                    return truck;
                }
            )
        );
        setEditingTruck(null);
    };
    const handleCancelAddRoute = () => {
            setEditingTruck(null);
    };
    const handleExistedRouteClick = (truckNumber: string, day: string) => {
        setEditingTruck({
            truckNumber,
            day
        });
    };

    const handleAddTruckClick = () => {
        setModalContent(<AddTruck setLegend={setLegend} onModalVisible={setIsModalVisible} />);
        setIsModalVisible((prev) => !prev);
    };

    return (
        <>
            <div className="w-full h-full flex bg-gray-800">
                <div className="w-1/2 overflow-y-scroll scrollbar-hide">
                    <div className="flex h-8 w-full border-b border-gray-600">
                        <div className="flex-1 text-white font-semibold text-center"><p>Truck</p></div>
                        { week.map((day) => {
                            return (
                                <div key={ day } className="flex">
                                    <div className="w-4 border-l border-gray-400 bg-gray-600"></div>
                                    <div className="border-l border-gray-400 w-[104px] over"><span
                                        className="text-white block text-center">{ moment(day).format('DD.MM ddd').toUpperCase() }</span>
                                    </div>
                                </div>
                            )
                        }) }
                    </div>
                    { legend && legend.map((truck) => {
                        return (
                            <div key={ truck.number }
                                 className="flex w-full bg-gray-900 font-semibold border-b border-gray-400">
                                <div className="flex-1 text-white px-2 bg-gray-700 overflow-x-hidden hover:bg-gray-600 hover:cursor-pointer">
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
                                            <div className="border-l border-gray-400 w-[104px] bg-gray-700 relative">
                                                { truck.workLegend && truck.workLegend.map((route, index) => {
                                                    if (route.date === day) {
                                                        return (
                                                            <div key={ index } onClick={() => handleExistedRouteClick(truck.number, day)} className="flex h-full">
                                                                { hasRoute && editingTruck?.truckNumber === truck.number && editingTruck.day === day ?
                                                                    (
                                                                        <AddRoute
                                                                            key={ `${ truck.number }-${ day }` }
                                                                            editingTruck={ editingTruck }
                                                                            onRouteAdded={ handleAddRoute }
                                                                            onCancel={ handleCancelAddRoute }
                                                                            existedRoute={ route }
                                                                        />
                                                                    ) :
                                                                    (
                                                                        <div
                                                                            className={ `text-sm font-light px-1 w-full h-full overflow-x-hidden ${ route.status === 'DONE' ? 'bg-gray-600 text-gray-900' : route.status === 'LOADING' ? 'bg-green-300 hover:bg-green-200 cursor-pointer' : 'bg-blue-300 hover:bg-blue-200 cursor-pointer' }` }>
                                                                            <p className="block w-full h-5 overflow-hidden text-[0.8rem]">{ `${ route.to[0].toUpperCase() }${ route.to.slice(1).toLowerCase() }` }</p>
                                                                            <p>{ route.deliveryTime }</p>
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                }) }
                                                { !hasRoute && (
                                                    editingTruck?.truckNumber === truck.number && editingTruck.day === day ?
                                                        (
                                                            <AddRoute
                                                                key={ `${ truck.number }-${ day }` }
                                                                editingTruck={ editingTruck }
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
                <div className="h-full w-1/2 flex flex-col border-l border-gray-200">
                    <div className="h-full w-full border-b border-gray-200"></div>
                    <div className="bg-red-300 h-full w-full"></div>
                </div>
            </div>
            { isModalVisible && <ModalWindow onModalVisible={setIsModalVisible} children={ modalContent }/> }
        </>
    )
}

export default TableModern;