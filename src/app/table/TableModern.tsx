import rightArrow from '../../assets/right-arrow.svg';
import { ReactNode, useEffect, useState } from "react";
import ModalWindow from "../../utils/ModalWindow.tsx";
import moment from "moment/min/moment-with-locales";
import AddRoute, { Route } from "./legend/AddRoute.tsx";
import { generateWeek } from "../../utils/utils.tsx";
import AddTruck from "../../utils/modals/AddTruck.tsx";
import TruckNote from "./tabs/TruckNote.tsx";
import DailyNote from "./tabs/DailyNote.tsx";
import { useAuth } from "../auth/AuthProvider.tsx";
import { FetchWrapper } from "../../utils/FetchWrapper.tsx";

const browserLanguage= navigator.language;

export interface Legend {
    id: string;
    number: string;
    legends: Route[];
}
export interface EditingTruck {
    truckNumber: string;
    day: string;
}

function TableModern() {
    moment.locale(browserLanguage);

    const fetchWrapper = new FetchWrapper('/trucks');
    const { isAuthenticated } = useAuth();
    const week: string[] = generateWeek();
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<ReactNode>(null);
    const [legend, setLegend] = useState<Legend[]>([]);
    const [editingTruck, setEditingTruck] = useState<EditingTruck | null>(null);
    const [truckId, setTruckId] = useState<string | null>(null);

    useEffect(() => {
        if (isAuthenticated) {
            fetchWrapper.get<Legend[]>('/get-all')
                .then(trucks => setLegend(trucks));
        }
    }, []);

    const handleAddRoute = (route: Route, certainLegend: EditingTruck) => {
        const { truckNumber } = certainLegend;
        setLegend((prevLegend) =>
            prevLegend.map((truck) => {
                    if (truck.number === truckNumber) {
                        const isRouteExist = truck.legends.some((existingRoute) => existingRoute.date === route.date);

                        // If route already exists just update fields, otherwise add new legend
                        const updatedLegend = isRouteExist
                            ? truck.legends.map((existingRoute) =>
                                    existingRoute.date === route.date
                                        ? { ...existingRoute, ...route }
                                        : existingRoute
                            ) : [...truck.legends, route];
                        return { ...truck, legends: updatedLegend };
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
    const handleTruckClick = (truckId: string) => {
        setTruckId(truckId);
    };

    return (
        <>
            <div className="w-full h-full flex bg-gray-800">
                <div className="w-1/2 overflow-y-scroll scrollbar-hide relative">
                    <div className="bg-transparent z-[1] w-full h-full absolute flex justify-center items-center">
                        <span className="text-white font-semibold text-xl italic opacity-50">Trucks table</span>
                    </div>
                    <div className="z-[2] relative">
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
                                    <div onClick={ () => handleTruckClick(truck.id) }
                                         className="flex-1 text-white px-2 bg-gray-700 overflow-x-hidden hover:bg-gray-600 hover:cursor-pointer">
                                        <p>{ truck.number.toUpperCase() }</p>
                                    </div>
                                    { week.map((day) => {
                                        const hasRoute = truck.legends.some((route) => route.date === day);

                                        return (
                                            <div key={ day } className="flex">
                                                <div
                                                    className="w-4 border-l border-gray-400 bg-gray-600 flex justify-center align-middle">
                                                    <img src={ rightArrow } alt=""/>
                                                </div>
                                                <div
                                                    className="border-l border-gray-400 w-[104px] bg-gray-700 relative">
                                                    { truck.legends && truck.legends.map((route, index) => {
                                                        if (route.date === day) {
                                                            return (
                                                                <div key={ index }
                                                                     onClick={ () => handleExistedRouteClick(truck.number, day) }
                                                                     className="flex h-full">
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
                            <button onClick={ handleAddTruckClick } className="w-full bg-gray-300 hover:bg-gray-200">
                                New truck
                            </button>
                        </div>
                    </div>
                </div>
                <div className="h-full w-1/2 flex flex-col border-l border-gray-200">
                    <TruckNote truckId={ truckId }/>
                    <DailyNote/>
                </div>
            </div>
            { isModalVisible && <ModalWindow onModalVisible={ setIsModalVisible } children={ modalContent }/> }
        </>
    )
}

export default TableModern;