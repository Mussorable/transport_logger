import DailyNoteScreen from "./DailyNoteScreen.tsx";
import { useState } from "react";

export interface ShortNote {
    message: string;
    isImportant: boolean;
}

function DailyNote() {
    const initDailyNote: ShortNote[] = [
        {
            message: 'asd',
            isImportant: false,
        },
        {
            message: 'asd',
            isImportant: false,
        },
        {
            message: 'asd',
            isImportant: false,
        }
    ];
    const [dailyNotes, setDailyNotes] = useState<ShortNote[]>(initDailyNote);

    return (
        <div className="bg-gray-800 h-full w-full">
            <DailyNoteScreen dailyNotes={dailyNotes} setDailyNotes={setDailyNotes} />
            <div></div>
        </div>
    );
}

export default DailyNote;