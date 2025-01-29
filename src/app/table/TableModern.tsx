import rightArrow from '../../assets/right-arrow.svg';
import { ReactNode, MouseEvent, useEffect, useState } from "react";
import ModalWindow from "../../utils/ModalWindow.tsx";
import moment from "moment/min/moment-with-locales";
import AddRoute, { Route } from "./legend/AddRoute.tsx";
import { generateWeek } from "../../utils/utils.tsx";
import AddTruck from "../../utils/modals/AddTruck.tsx";
import TruckNote from "./tabs/TruckNote.tsx";
import DailyNote from "./tabs/DailyNote.tsx";
import { useAuth } from "../auth/AuthProvider.tsx";
import { FetchWrapper } from "../../utils/FetchWrapper.tsx";
import { useNotification } from "../../utils/NotificationContext.tsx";

const browserLanguage= navigator.language;

export interface Legend {
    id: string;
    number: string;
    legends: Route[];
}
export interface EditingTruck {
    truckId: string;
    day: string;
    routeId?: string;
}

function TableModern() {
    moment.locale(browserLanguage);

    const { addNotification } = useNotification();
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
        const { truckId } = certainLegend;
        const { id } = route;
        const isRouteExist = legend.some((truck) =>
            truck.id === truckId && truck.legends.some((existedRoute) => existedRoute.id === route.id));

        if (!isRouteExist) {
            fetchWrapper.post<Route>(`/${truckId}/add-legend`, route)
                .then((newRoute) => {
                    setLegend((prevLegend) => {
                        return prevLegend.map((truck) => {
                            if (truck.id === truckId) {
                                return { ...truck, legends: [ ...truck.legends, newRoute ] }
                            }
                            return truck;
                        })
                    });
                    addNotification('success', 'Route added');
                })
                .catch((error) => {
                    console.log(error);
                    addNotification('error', 'Error while adding route');
                });
        } else {
            fetchWrapper.put<Route>(`/${truckId}/legends/${id}`, route)
                .then((editedRoute) => {
                    setLegend((prevLegend) => {
                        return prevLegend.map((truck) => {
                            if (truck.id === truckId) {
                                const updatedLegends = truck.legends.map((existingRoute) => {
                                    return existingRoute.id === route.id ? { ...existingRoute, ...editedRoute } : existingRoute;
                                });
                                return { ...truck, legends: updatedLegends }; // Обновляем весь объект truck
                            }
                            return truck;
                        });
                    });
                    addNotification('warning', 'Route edited');
                })
                .catch((error) => {
                    console.log(error);
                    addNotification('error', 'Error while editing route');
                });
        }

        setEditingTruck(null);
    };
    const handleCancelAddRoute = () => {
            setEditingTruck(null);
    };
    const handleAddTruckClick = () => {
        setModalContent(<AddTruck legend={legend} setLegend={setLegend} onModalVisible={setIsModalVisible} />);
        setIsModalVisible((prev) => !prev);
    };
    const handleTruckClick = (truckId: string) => {
        setTruckId(truckId);
    };
    const handleStatusChange = (e: MouseEvent<HTMLDivElement>, routeId: string, currentTruck: Legend) => {
        e.preventDefault();

        const updatedLegends = legend.map(truck => {
            if (truck.id === currentTruck.id) {
                return {
                    ...truck,
                    legends: truck.legends.map(route =>
                        route.id === routeId ? {...route, status: "DONE"} : route
                    )
                };
            }
            return truck;
        });

        fetchWrapper.put<Route>(`/${currentTruck.id}/legends/${routeId}`, { status: "DONE" })
            .then((response) => {
                console.log(response);
                setLegend(updatedLegends);
                addNotification('warning', 'Route marked as done');
            })
            .catch(error => {
                console.error(error);
                addNotification('error', 'Failed to update status');
            });
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
                                        const dayRoutes = truck.legends.filter(route => route.date === day);

                                        return (
                                            <div key={ day } className="flex">
                                                <div
                                                    className="w-4 border-l border-gray-400 bg-gray-600 flex justify-center align-middle">
                                                    <img src={ rightArrow } alt=""/>
                                                </div>
                                                <div
                                                    className="border-l border-gray-400 w-[104px] bg-gray-700 relative">
                                                    <div className="flex h-full scroll-smooth overflow-x-scroll scrollbar-hide"
                                                         onWheel={(e) => {
                                                             e.currentTarget.scrollLeft += e.deltaY * 1.2;
                                                             e.preventDefault();
                                                         }}>
                                                        { editingTruck?.truckId === truck.id && editingTruck?.day === day ? (
                                                            editingTruck?.routeId ? (
                                                                dayRoutes
                                                                    .filter(route => route.id === editingTruck?.routeId)
                                                                    .map(route => (
                                                                        <div key={ route.id } className="w-full">
                                                                            <AddRoute
                                                                                editingTruck={ editingTruck }
                                                                                onRouteAdded={ handleAddRoute }
                                                                                onCancel={ handleCancelAddRoute }
                                                                                existedRoute={ route }
                                                                            />
                                                                        </div>
                                                                    ))
                                                            ) : (
                                                                <div className="w-full">
                                                                    <AddRoute
                                                                        editingTruck={ editingTruck }
                                                                        onRouteAdded={ handleAddRoute }
                                                                        onCancel={ handleCancelAddRoute }
                                                                    />
                                                                </div>
                                                            )
                                                        ) : (
                                                            <>
                                                                { dayRoutes.map((route) => (
                                                                    <div
                                                                        key={ route.id }
                                                                        className={ `cursor-pointer hover:w-full flex-1 ${ dayRoutes.length > 1 && dayRoutes.length < 4 ? `w-1/${ dayRoutes.length + 1 }` : dayRoutes.length >= 4 ? `w-1/${dayRoutes.length}` : 'w-full' }` }
                                                                    >
                                                                        <div
                                                                            onContextMenu={ e => handleStatusChange(e, route.id, truck) }
                                                                            onClick={ () => setEditingTruck({
                                                                                truckId: truck.id,
                                                                                day,
                                                                                routeId: route.id
                                                                            }) }
                                                                            className={ `text-sm overflow-hidden font-light w-full px-1 h-full ${
                                                                                route.status === 'DONE' ? 'bg-gray-600 text-gray-900'
                                                                                    : route.status === 'LOADING' ? 'bg-green-300 hover:bg-green-200'
                                                                                        : 'bg-blue-300 hover:bg-blue-200'
                                                                            }` }
                                                                        >
                                                                            <p className="w-full h-5 overflow-hidden text-[0.7rem]">{ route.to }</p>
                                                                            <p>{ route.deliveryTime }</p>
                                                                        </div>
                                                                    </div>
                                                                )) }

                                                                { (dayRoutes.length < 4) && (
                                                                    <button
                                                                        className={ `bg-gray-700 hover:bg-gray-600 ${
                                                                            dayRoutes.length > 0 ? `w-1/4` : 'w-full'
                                                                        } text-sm p-1` }
                                                                        onClick={ () => setEditingTruck({
                                                                            truckId: truck.id,
                                                                            day,
                                                                        }) }
                                                                    >
                                                                        { dayRoutes.length > 0 ? '+' : 'Add' }
                                                                    </button>
                                                                ) }
                                                            </>
                                                        ) }
                                                    </div>
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
                    <TruckNote truckId={ truckId } onTruckId={ setTruckId } onSetLegend={ setLegend }/>
                    <DailyNote/>
                </div>
            </div>
            { isModalVisible && <ModalWindow onModalVisible={ setIsModalVisible } children={ modalContent }/> }
        </>
    )
}

export default TableModern;