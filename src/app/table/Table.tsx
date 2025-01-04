import rightArrow from '../../assets/right-arrow.svg';

function Table() {
    const legend = [
        {
            number: "5E7 1856",
            workLegend: [
                {
                    date: "ROUTE_DATE",
                    to: "TO CITY",
                    status: "DONE"
                },
                {
                    date: "ROUTE_DATE",
                    to: "TO CITY",
                    status: "LOADING"
                },
                {
                    date: "ROUTE_DATE",
                    to: "TO CITY",
                    status: "FUTURE"
                }
            ]
        },
        {
            number: "5E4 1984",
            workLegend: [
                {
                    date: "ROUTE_DATE",
                    to: "TO CITY",
                    status: "DONE"
                },
                {
                    date: "ROUTE_DATE",
                    to: "TO CITY",
                    status: "UNLOADING"
                },
                {
                    date: "ROUTE_DATE",
                    to: "TO CITY",
                    status: "LOADING"
                }
            ]
        },
        {
            number: "6E8 3847",
            workLegend: [
                {
                    date: "ROUTE_DATE",
                    to: "TO CITY",
                    status: "DONE"
                },
                {
                    date: "ROUTE_DATE",
                    to: "TO CITY",
                    status: "LOADING"
                },
                {
                    date: "ROUTE_DATE",
                    to: "TO CITY",
                    status: "UNLOADING"
                }
            ]
        }
    ]

    return (
        <div className="w-full h-full">
            { legend && legend.map(truck => {
                return (
                    <div key={truck.number} className="flex bg-gray-900 font-semibold border-b border-gray-400">
                        <div className="text-white border-r-2 border-gray-400 px-2 bg-gray-700 w-32">
                            <p>{truck.number}</p>
                        </div>
                        <div className="flex-1 flex">
                            {truck.workLegend && truck.workLegend.map((route, index) => {
                                return (
                                    <>
                                        <div className="w-6 bg-gray-600 flex justify-center align-middle"><img src={rightArrow} alt=""/></div>
                                        <div key={index} className={ `text - white text-sm font-light border-x px-2 ${route.status === 'DONE' ? 'bg-gray-400' : route.status === 'LOADING' ? 'bg-green-300' : 'bg-blue-300'}` }>
                                            <p>Date:<span>{ route.date }</span></p>
                                            <p>To:<span>{ route.to }</span></p>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                )
            }) }
        </div>
    )
}

export default Table;