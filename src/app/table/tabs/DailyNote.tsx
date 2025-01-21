import DailyNoteScreen from "./DailyNoteScreen.tsx";
import { useState, MouseEvent, ChangeEvent, FormEvent, useEffect } from "react";
import { FetchWrapper } from "../../../utils/FetchWrapper.tsx";

export interface ShortNote {
    id: string | undefined;
    message: string;
    isImportant: boolean;
    [key: string]: unknown;
}

function DailyNote() {
    const fetchWrapper = new FetchWrapper('/notes');

    const initNewNote: ShortNote = {
        id: undefined,
        message: '',
        isImportant: false,
    };
    const [newNote, setNewNote] = useState<ShortNote>(initNewNote);
    const [dailyNotes, setDailyNotes] = useState<ShortNote[]>([]);
    const [isCreating, setIsCreating] = useState<boolean>(false);

    useEffect(() => {
        fetchWrapper.get<ShortNote[]>('/get-all')
            .then(data => setDailyNotes(data));
    }, []);

    const handleFormSubmit = (e: FormEvent): void => {
        e.preventDefault();

        fetchWrapper.post<ShortNote>('/add', newNote)
            .then(newNote => {
                setDailyNotes(prev => [...prev, newNote]);
                setIsCreating(false);
                setNewNote(initNewNote);
            });
    };
    const handleNewNoteMessage = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        if (e.currentTarget.value[0] === '!') {
            setNewNote(prev => ({ ...prev, isImportant: true }));
        } else setNewNote(prev => ({ ...prev, isImportant: false }));
        setNewNote(prev => ({ ...prev, message: e.target.value }));
    };
    const handleFormReset = (e: MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();

        setIsCreating(false);
        setNewNote(initNewNote);
    };

    return (
        <div className="bg-gray-800 h-full w-full flex flex-col justify-between overflow-y-scroll scrollbar-hide">
            <DailyNoteScreen dailyNotes={dailyNotes} setDailyNotes={setDailyNotes} />
            {!isCreating ?
                (<div className="w-full px-2 py-2">
                    <button onClick={ () => setIsCreating(true) } className="bg-gray-400 hover:bg-gray-200 px-4">Add</button>
                </div>)
                :
                (
                    <div className="w-full px-2 py-2">
                        <form onSubmit={handleFormSubmit} action="" className="flex flex-col gap-2">
                            <div>
                                <button className="bg-gray-400 hover:bg-gray-200 px-4 mr-2">Save</button>
                                <button onClick={handleFormReset} className="bg-gray-400 hover:bg-gray-200 px-4 mr-2">Cancel</button>
                            </div>
                            <textarea name="" id="" value={newNote.message} onChange={handleNewNoteMessage} className="resize-none"></textarea>
                        </form>
                    </div>
                )
            }
        </div>
    );
}

export default DailyNote;