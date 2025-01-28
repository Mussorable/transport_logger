import DailyNoteScreen from "./DailyNoteScreen.tsx";
import { useState, MouseEvent, ChangeEvent, FormEvent, useEffect } from "react";
import { FetchWrapper } from "../../../utils/FetchWrapper.tsx";
import { useNotification } from "../../../utils/NotificationContext.tsx";
import { ServerResponse } from "../../auth/AppInitializer.tsx";
import { Link } from "react-router-dom";

export interface ShortNote {
    id: string | undefined;
    noteMessage: string;
    isImportant: boolean;
    [key: string]: unknown;
}

function DailyNote() {
    const fetchWrapper = new FetchWrapper('/notes');
    const { addNotification } = useNotification();
    const initNewNote: ShortNote = {
        id: undefined,
        noteMessage: '',
        isImportant: false,
    };
    const [newNote, setNewNote] = useState<ShortNote>(initNewNote);
    const [dailyNotes, setDailyNotes] = useState<ShortNote[]>([]);
    const [isCreating, setIsCreating] = useState<boolean>(false);

    useEffect(() => {
        fetchWrapper.get<ShortNote[]>('/get-all')
            .then(notes => setDailyNotes(notes));
    }, []);

    const handleFormSubmit = (e: FormEvent): void => {
        e.preventDefault();

        if (!newNote.noteMessage) {
            return setIsCreating(false);
        }

        fetchWrapper.post<ShortNote & ServerResponse>('/add', newNote)
            .then(response => {
                const { status, message, ...addedNote } = response;
                setDailyNotes(prev => [...prev, addedNote as ShortNote]);
                setIsCreating(false);
                setNewNote(initNewNote);
                addNotification(status, message);
            });
    };
    const handleNewNoteMessage = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        if (e.currentTarget.value[0] === '!') {
            setNewNote(prev => ({ ...prev, isImportant: true }));
        } else setNewNote(prev => ({ ...prev, isImportant: false }));
        setNewNote(prev => ({ ...prev, noteMessage: e.target.value }));
    };
    const handleFormReset = (e: MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();

        setIsCreating(false);
        setNewNote(initNewNote);
    };

    return (
        <div className="bg-gray-800 h-full w-full flex flex-col justify-between overflow-y-scroll scrollbar-hide relative">
            <div className="absolute bg-transparent z-[1] w-full h-full justify-center items-center flex flex-col">
                <span className="text-white font-semibold italic text-xl opacity-50">Daily notes</span>
                <span className="text-white italic text-sm opacity-50">notes will be deleted the following night</span>
            </div>
            <DailyNoteScreen dailyNotes={dailyNotes} setDailyNotes={setDailyNotes} />
            {!isCreating ?
                (
                    <div className="w-full px-2 py-2 z-[2] flex justify-between">
                        <button onClick={ () => setIsCreating(true) } className="bg-gray-400 hover:bg-gray-200 px-4">Add</button>
                        <Link className="bg-red-800 hover:opacity-100 opacity-50 px-4" to={'/logout'}>Logout</Link>
                    </div>
                )
                :
                (
                    <div className="w-full px-2 py-2 z-[2]">
                        <form onSubmit={handleFormSubmit} action="" className="flex flex-col gap-2">
                            <div>
                                <button className="bg-gray-400 hover:bg-gray-200 px-4 mr-2">Save</button>
                                <button onClick={handleFormReset} className="bg-gray-400 hover:bg-gray-200 px-4 mr-2">Cancel</button>
                                <span className="italic text-orange-300 text-md">Use ! sign to make note important</span>
                            </div>
                            <textarea name="" id="" value={newNote.noteMessage} onChange={handleNewNoteMessage} className="resize-none"></textarea>
                        </form>
                    </div>
                )
            }
        </div>
    );
}

export default DailyNote;