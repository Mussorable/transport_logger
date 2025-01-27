import { Note } from "./TruckNote.tsx";
import { FetchWrapper } from "../../../utils/FetchWrapper.tsx";
import { ServerResponse } from "../../auth/AppInitializer.tsx";
import { useNotification } from "../../../utils/NotificationContext.tsx";

interface NoteScreenProps {
    notes: Note[];
    truckId: string | null;
    onSetNotes(notes: (prevNotes: Note[]) => Note[]): void;
}

function NoteScreen({ notes, truckId, onSetNotes }: NoteScreenProps) {
    const { addNotification } = useNotification();
    const fetchWrapper = new FetchWrapper('/trucks');
    const typeStyles = {
        "MAINTENANCE": "bg-blue-900",
        "DRIVER": "bg-orange-500",
        "ROUTE": "bg-amber-700",
        "DONE": "bg-gray-700",
    }

    const handleTypeClick = (note: Note) => {
        if (truckId && note.type !== "DONE") {
            fetchWrapper.put<Note & ServerResponse>(`/${truckId}/records/${note.id}`, { type: "DONE" })
                .then((response) => {
                    const { status, message } = response;
                    onSetNotes((prevNotes) => {
                        return prevNotes.map((n) =>
                            n.id === note.id ? { ...n, type: "DONE" } : n
                        );
                    });
                    addNotification(status, message);
                })
                .catch((error) => {
                    console.log(error);
                    addNotification('error', 'Error while changing note');
                });
        }
    };

    return (
        <div
            className="w-full h-full relative bg-gray-600 border-2 border-gray-900 overflow-x-hidden overflow-y-scroll scrollbar-hide">
            <div className="bg-transparent z-[1] w-full h-full absolute flex flex-col justify-center items-center">
                <span className="text-white font-semibold text-xl italic opacity-50">Truck notes</span>
                <span className="text-white italic text-sm opacity-50">select truck to see notes</span>
            </div>
            { truckId && <div className="relative z-[2]">
                { notes && notes.map((note, index) => {
                    return (
                        <div key={ `${ index }-note` }
                             className={ `flex ${ typeStyles[note.type] } ${ (note.isImportant && note.type != "DONE") ? 'animate-blink' : '' }` }>
                            <div>
                                <span className="text-gray-500 px-4">{ note.date }</span>
                            </div>
                            <div className="flex-1 border-x border-gray-900 text-white px-4"><span>{ note.note }</span>
                            </div>
                            <div className="w-32 text-left">
                                <span onClick={ () => handleTypeClick(note) }
                                      className="text-gray-500 px-4 block w-full cursor-pointer">{ note.type.toLowerCase() }</span>
                            </div>
                        </div>
                    )
                }) }
            </div> }
        </div>
    );
}

export default NoteScreen;