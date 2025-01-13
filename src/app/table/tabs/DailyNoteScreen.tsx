import { ShortNote } from "./DailyNote.tsx";
import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";


interface DailyNoteProps {
    dailyNotes: ShortNote[];
    setDailyNotes(dailyNotes: (oldNotes: ShortNote[]) => ShortNote[]): void;
}

function DailyNoteScreen({ dailyNotes, setDailyNotes }: DailyNoteProps) {
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editingNote, setEditingNote] = useState<ShortNote | null>(null);

    const handleNoteClick = (note: ShortNote, index: number): void => {
        setEditingNote(note);
        setEditingIndex(index);
    };
    const handleSubmitEditingNote = (e: FormEvent, index: number): void => {
        e.preventDefault();

        setDailyNotes((oldNotes: ShortNote[]) => {
            return oldNotes.map((note, i) =>
                i === index && editingNote ? (editingNote.message.length < 1) ?
                    { ...editingNote, message: '(empty)' } : editingNote
                    : note
            )
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
                    message: value,
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
        <div className="w-full">
            <ul>
                { dailyNotes && dailyNotes.map((note, index) => (
                    <li key={ `${ index }-daily-note` } onClick={ () => handleNoteClick(note, index) }
                        className={ `cursor-pointer ${ !editingNote ? 'px-4' : '' } block ${note.isImportant ? ' bg-red-700 hover:bg-red-600' : 'bg-gray-500 hover:bg-gray-400'} border-b-2 border-gray-900` }>
                        { editingNote && editingIndex === index ? (
                            <form onSubmit={ e => handleSubmitEditingNote(e, index) } action="">
                                <textarea onKeyDown={ handleKeyEnter } value={ editingNote.message }
                                          onChange={ handleTextChange } autoFocus={ true }
                                          className="resize-none w-full h-auto scrollbar-hide overflow-auto"></textarea>
                                <button type="submit" className="hidden"></button>
                            </form>
                        ) : (
                            <p className="text-white whitespace-pre-wrap">{ note.message }</p>
                        ) }
                    </li>
                )) }
            </ul>
        </div>
    )
}

export default DailyNoteScreen;