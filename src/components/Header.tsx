import { isToday } from "date-fns";
import { useHabbits } from "../context/useHabbit";
import Button from "./Button";

export default function Header() {
    const { habbits } = useHabbits();
    const doneToday = habbits.filter(habbit => habbit.completions.some(d => isToday(d))).length;
    const total = habbits.length;

    return <header className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold">Habbit Tracker</h1>
            <span className="text-zinc-400 text-sm">{doneToday} / {total} done today</span>
        </div>
        <div className="flex flex-col gap-1">
            <span className="text-zinc-400 text-sm">6 avril - 12 avril</span>
            <div className="flex items-center gap-3">
                <Button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
                    </svg>
                </Button>
                <Button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
                    </svg>
                </Button>
            </div>
        </div>
    </header>
}

