import { Note } from "./TruckNote.tsx";

interface NoteScreenProps {
    notes: Note[];
}

function NoteScreen({ notes }: NoteScreenProps) {
    const typeStyles = {
        "MAINTENANCE": "bg-blue-900",
        "DRIVER": "bg-orange-500",
        "ROUTE": "bg-amber-700",
        "DONE": "bg-gray-700",
    }

    return (
        <div
            className="w-full h-full relative bg-gray-600 border-2 border-gray-900 overflow-x-hidden overflow-y-scroll scrollbar-hide">
            <div className="bg-transparent z-[1] w-full h-full absolute flex flex-col justify-center items-center">
                <span className="text-white font-semibold text-xl italic opacity-50">Truck notes</span>
                <span className="text-white italic text-sm opacity-50">select truck to see notes</span>
            </div>
            <div className="relative z-[2]">
                { notes && notes.map((note, index) => {
                    return (
                        <div key={ `${ index }-note` }
                             className={ `flex ${ typeStyles[note.type] } ${ (note.isImportant && note.type != "DONE") ? 'animate-blink' : '' }` }>
                            <div className="border-r border-gray-900">
                                <span className="text-gray-500 px-4">{ note.date }</span>
                            </div>
                            <div className="flex-1 text-white px-4"><span>{ note.note }</span></div>
                        </div>
                    )
                }) }
            </div>
        </div>
    );
}

export default NoteScreen;