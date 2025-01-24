import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { handleBoolStateWithTimeout } from "../../../utils/utils.tsx";
import NoteScreen from "./NoteScreen.tsx";
import moment from "moment";
import { FetchWrapper } from "../../../utils/FetchWrapper.tsx";
import { ServerResponse } from "../../auth/AppInitializer.tsx";
import { useNotification } from "../../../utils/NotificationContext.tsx";

type NoteType = "MAINTENANCE" | "DRIVER" | "ROUTE" | "DONE";
export interface Note {
    date: string;
    note: string;
    isImportant: boolean;
    type: NoteType;
    [key: string]: unknown;
}

interface TruckNoteProps {
    truckId: string | null;
}

interface TruckNoteResponse {
    number: string;
    records: Note[];
}

function TruckNote({ truckId }: TruckNoteProps) {
    const { addNotification } = useNotification();
    const fetchWrapper = new FetchWrapper('/trucks');
    const noteTypes: NoteType[] = ["MAINTENANCE", "DRIVER", "ROUTE", "DONE"];
    const [isError, setIsError] = useState<string | boolean>(false);
    const [isConfirmed, setIsConfirmed] = useState<string | boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [notes, setNotes] = useState<Note[]>([]);
    const initNote: Note = {
        date: moment().format("DD.MM.YYYY"),
        note: "",
        isImportant: false,
        type: "MAINTENANCE",
    }
    const [newNote, setNewNote] = useState<Note>(initNote);
    const [truckNumber, setTruckNumber] = useState<string>('');

    useEffect(() => {
        if (truckId) {
            fetchWrapper.get<TruckNoteResponse>(`/${truckId}/records`)
                .then(truckData => {
                    setTruckNumber(truckData.number);
                    setNotes(truckData.records);
                });
        }
    }, [truckId]);

    const handleNoteSubmit = (e: FormEvent) => {
        const { note } = newNote;
        e.preventDefault();

        if (note.length === 0 || note.length > 70) {
            handleBoolStateWithTimeout(setIsError, 4000, "Note must be between 1 and 100 characters long");
            return;
        }

        fetchWrapper.post<Note & ServerResponse>(`/${truckId}/add-record`, newNote)
            .then((response) => {
                console.log(response);
                const { status, message, ...record } = response;
                setNotes(oldNotes => {
                    return [
                        ...oldNotes,
                        record as Note,
                    ]
                });
                addNotification(status, message);
            })

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
        <div className="h-full w-full border-b border-gray-200 relative flex flex-col">
            <div className="flex flex-col flex-1">
                { truckId &&
                    <div className='text-white w-full text-center py-2'>
                        <span className="font-bold text-xl">{ truckNumber }</span>
                    </div>
                }
                <div className="flex flex-col justify-between flex-1">
                    <div className="flex-1">
                        <NoteScreen notes={ notes }/>
                    </div>
                    { truckId &&
                        <div className="flex flex-col justify-start">
                            { isEditing &&
                                <span
                                    className="text-orange-300 px-4 py-2 italic">Use ! sign to make note important</span> }
                            <form onSubmit={ handleNoteSubmit } action="" className="flex justify-between mb-2 px-4">
                                { isEditing ?
                                    <div className="flex justify-between flex-1">
                                        <div>
                                            <button
                                                className="bg-gray-400 hover:bg-gray-200 border mr-2 border-gray-900 px-4"
                                                onClick={ handleNoteCancel } type="reset">Cancel
                                            </button>
                                            <button
                                                className="bg-gray-400 hover:bg-gray-200 border mr-2 border-gray-900 px-4"
                                                type="submit">Save
                                            </button>
                                        </div>
                                        <div className="flex-1 flex mr-2 ">
                                            <input value={ newNote.note } onChange={ handleNoteChange }
                                                   className={ `flex-1 mr-2 outline-none border ${ isError && 'border-red-500' }` }
                                                   type="text"/>
                                            <select name="" id="" value={ newNote.type } onChange={ handleNoteTypeChange }>
                                                { noteTypes.map(type => (
                                                    <option value={ type } key={ type }>{ type.toLowerCase() }</option>)) }
                                            </select>
                                        </div>
                                    </div>
                                    :
                                    <button onClick={ () => setIsEditing(true) }
                                            className="bg-gray-400 hover:bg-gray-200 px-8 mt-2">Add</button>
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
                    }
                </div>
            </div>
        </div>
    )
}

export default TruckNote;