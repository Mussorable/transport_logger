import { ShortNote } from "./DailyNote.tsx";
import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";
import { FetchWrapper } from "../../../utils/FetchWrapper.tsx";


interface DailyNoteProps {
    dailyNotes: ShortNote[];
    setDailyNotes(dailyNotes: (oldNotes: ShortNote[]) => ShortNote[]): void;
}

function DailyNoteScreen({ dailyNotes, setDailyNotes }: DailyNoteProps) {
    const fetchWrapper = new FetchWrapper('/notes');
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editingNote, setEditingNote] = useState<ShortNote | null>(null);

    const handleNoteClick = (note: ShortNote, index: number): void => {
        setEditingNote(note);
        setEditingIndex(index);
    };
    const handleSubmitEditingNote = (e: FormEvent): void => {
        e.preventDefault();

        if (!editingNote || !editingNote.id) return;

        if (editingNote.noteMessage.length === 1) {
            fetchWrapper.delete<ShortNote>(`/${editingNote.id}`)
                .then(() => {
                    setDailyNotes((oldNotes: ShortNote[]) => oldNotes.filter((note) => note.id !== editingNote.id));
                });
            return;
        }

        fetchWrapper.put<ShortNote>(`/${editingNote.id}`, editingNote)
            .then((updatedNote) => {
                setDailyNotes((oldNotes: ShortNote[]) => {
                    return oldNotes.map((note) =>
                        note.id === updatedNote.id
                            ? { ...updatedNote, noteMessage: updatedNote.noteMessage } : note
                    )
                });
            });

        setEditingNote(null);
        setEditingIndex(null);
    };
    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        const value = e.currentTarget.value;
        setEditingNote(oldNote => {
            if (oldNote)
                return {
                    ...oldNote,
                    noteMessage: value,
                    isImportant: value[0] === '!',
                }
            else return null;
        });
    };
    const handleKeyEnter = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            e.currentTarget.form?.requestSubmit();
        }
    };

    return (
        <div className="w-full z-[1]">
            <ul>
                { dailyNotes && dailyNotes.map((note, index) => (
                    <li key={ `${ note.id }-daily-note` } onClick={ () => handleNoteClick(note, index) }
                        className={ `cursor-pointer ${ !editingNote ? 'px-4' : '' } block ${note.isImportant ? ' bg-red-700 hover:bg-red-600' : 'bg-gray-500 hover:bg-gray-400'} border-b-2 border-gray-900` }>
                        { editingNote && editingIndex === index ? (
                            <form onSubmit={ e => handleSubmitEditingNote(e) } action="">
                                <textarea placeholder={ !editingNote.noteMessage ? "Empty note will be deleted" : '' }
                                          onKeyDown={ handleKeyEnter } value={ editingNote.noteMessage }
                                          onChange={ handleTextChange } autoFocus={ true }
                                          className="resize-none placeholder:italic w-full h-auto scrollbar-hide overflow-auto"></textarea>
                                <button type="submit" className="hidden"></button>
                            </form>
                        ) : (
                            <p className="text-white whitespace-pre-wrap">{ note.noteMessage }</p>
                        ) }
                    </li>
                )) }
            </ul>
        </div>
    )
}

export default DailyNoteScreen;