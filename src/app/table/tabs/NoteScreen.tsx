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
        <div className="w-full h-full bg-gray-600 border-2 border-gray-900 overflow-x-hidden overflow-y-scroll scrollbar-hide">
            { notes && notes.map((note, index) => {
                return (
                    <div key={ `${ index }-note` } className={ `flex ${ typeStyles[note.type] } ${note.isImportant ? 'animate-blink' : ''}` }>
                        <div className="border-r border-gray-900"><span className="text-gray-500 px-4">{ note.date }</span></div>
                        <div className="flex-1 text-white px-4"><span>{ note.note }</span></div>
                    </div>
                )
            }) }
        </div>
    );
}

export default NoteScreen;