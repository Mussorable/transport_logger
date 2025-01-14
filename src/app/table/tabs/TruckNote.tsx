import { ChangeEvent, FormEvent, useState } from "react";
import { handleBoolStateWithTimeout } from "../../../utils/utils.tsx";
import NoteScreen from "./NoteScreen.tsx";
import moment from "moment";

type NoteType = "MAINTENANCE" | "DRIVER" | "ROUTE" | "DONE";
export interface Note {
    date: string;
    note: string;
    isImportant: boolean;
    type: NoteType;
}

interface TruckNoteProps {
    truckNumber: string | null;
}

function TruckNote({ truckNumber }: TruckNoteProps) {
    const noteTypes: NoteType[] = ["MAINTENANCE", "DRIVER", "ROUTE", "DONE"];
    const [isError, setIsError] = useState<string | boolean>(false);
    const [isConfirmed, setIsConfirmed] = useState<string | boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [notes, setNotes] = useState<Note[]>([
        {
            date: moment().format("DD.MM.YYYY"),
            note: "Routine maintenance required",
            isImportant: false,
            type: "MAINTENANCE",
        },
        {
            date: moment().format("DD.MM.YYYY"),
            note: "Driver's license is expiring soon",
            isImportant: true,
            type: "DRIVER",
        },
        {
            date: moment().format("DD.MM.YYYY"),
            note: "New route planned",
            isImportant: false,
            type: "ROUTE",
        },
        {
            date: moment().format("DD.MM.YYYY"),
            note: "Task is done",
            isImportant: false,
            type: "DONE",
        },
    ]);
    const initNote: Note = {
        date: moment().format("DD.MM.YYYY"),
        note: "",
        isImportant: false,
        type: "MAINTENANCE",
    }
    const [newNote, setNewNote] = useState<Note>(initNote);

    const handleNoteSubmit = (e: FormEvent) => {
        const { note } = newNote;
        e.preventDefault();

        if (note.length === 0 || note.length > 70) {
            handleBoolStateWithTimeout(setIsError, 4000, "Note must be between 1 and 100 characters long");
            return;
        }

        setNotes(oldNotes => {
            return [
                ...oldNotes,
                newNote
            ]
        });

        handleBoolStateWithTimeout(setIsConfirmed, 4000, "Note saved successfully");
        setIsEditing(false);
        setNewNote(initNote);
    };
    const handleNoteCancel = () => {
        setIsEditing(false);
        setNewNote(initNote);
    };
    const handleNoteChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        if (value[0] === '!')
            setNewNote(oldNote => {
                return {
                    ...oldNote,
                    isImportant: true,
                }
            });
        if (value.length > 70) return setIsError("Note must be between 1 and 100 characters long");
        if (isError && value.length < 100) return setIsError(false);
        setNewNote(oldNote => {
            return {
                ...oldNote,
                note: value,
            }
        });
    };
    const handleNoteTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.currentTarget.value;

        setNewNote(oldNote => {
            return {
              ...oldNote,
              type: value as NoteType,
            };
        });
    };

    return (
        <div className="h-full w-full border-b border-gray-200 flex flex-col">
            <div className={ `text-white text-center ${truckNumber ? 'py-2' : ''}` }>
                <span className="font-bold text-xl">{ truckNumber }</span>
            </div>
            <div className="flex-1">
                <NoteScreen notes={notes} />
            </div>
            <div className="flex flex-col justify-start">
                { isEditing && <span className="text-orange-300 px-4 py-2">"!" - sign before makes note important</span> }
                <form onSubmit={ handleNoteSubmit } action="" className="flex justify-between mb-2 px-4">
                    { isEditing ?
                        <div className="flex justify-between flex-1">
                            <div>
                                <button className="bg-gray-300 hover:bg-gray-200 border mr-2 border-gray-900 px-4"
                                        onClick={ handleNoteCancel } type="reset">Cancel
                                </button>
                                <button className="bg-gray-300 hover:bg-gray-200 border mr-2 border-gray-900 px-4" type="submit">Save
                                </button>
                            </div>
                            <div className="flex-1 flex mr-2 ">
                                <input value={newNote.note} onChange={handleNoteChange} className={ `flex-1 mr-2 outline-none border ${isError && 'border-red-500'}` } type="text"/>
                                <select name="" id="" value={newNote.type} onChange={ handleNoteTypeChange }>
                                    { noteTypes.map(type => (<option value={type} key={type}>{type.toLowerCase()}</option>)) }
                                </select>
                            </div>
                        </div>
                        :
                        <button onClick={ () => setIsEditing(true) }
                                className="bg-gray-300 hover:bg-gray-200 border border-gray-900 px-8 mt-2">Add</button>
                    }
                    { (isConfirmed || isError) &&
                        (
                            <span
                                className={ `block ${ isError ? 'text-red-500' : isConfirmed ? 'text-green-400' : 'text-white' }` }>
                                { isConfirmed ? isConfirmed : isError }
                            </span>
                        )
                    }
                </form>
            </div>
        </div>
    )
}

export default TruckNote;