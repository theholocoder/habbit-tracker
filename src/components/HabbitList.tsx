import { eachDayOfInterval, endOfWeek, format, isFuture, isSameDay, startOfWeek, subDays } from "date-fns";
import Button from "./Button";

export type Habbit = {
    id: string,
    name: string,
    completions: Date[],
}
type HabbitListProps = {
    habbits: Habbit[],
    toggleHabbit: (id: string, date: Date) => void,
    removeHabbit: (id: string) => void,
}

export default function HabbitList({ habbits, toggleHabbit, removeHabbit }: HabbitListProps) {
    if (habbits.length === 0) {
        return (
            <p className="text-center text-zinc-500 py-12">
                No habbits yet. Add one to get started!
            </p>
        )
    }

    return <div className="flex flex-col gap-3">
        {habbits.map(habbit => (
            <HabbitItem key={habbit.id} habbit={habbit} toggleHabbit={toggleHabbit} removeHabbit={removeHabbit} />
        ))}
    </div>
}

type HabbitItemProps = {
    habbit: Habbit,
    toggleHabbit: (id: string, date: Date) => void,
    removeHabbit: (id: string) => void,
}

function HabbitItem({ habbit, toggleHabbit, removeHabbit }: HabbitItemProps) {
    const visibleDates = eachDayOfInterval({
        start: startOfWeek(new Date(), { weekStartsOn: 1 }),
        end: endOfWeek(new Date(), { weekStartsOn: 1 })
    });

    function getStreak(completions: Date[]) {
        let streak = 0;
        let date = new Date();

        while (completions.some(d => isSameDay(d, date))) {
            streak++;
            date = subDays(date, 1);
        }

        return streak;
    }

    return <div className="rounded-xl bg-zinc-800 p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
            <div className="flex gap-3 items-center">
                <span className="font-medium">{habbit.name}</span>
                <span className="text-sm text-amber-400 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                    </svg>
                    {getStreak(habbit.completions)}
                </span>
            </div>
            <Button
                variant="ghost-destructive"
                className="text-sm"
                onClick={() => removeHabbit(habbit.id)}
            >Delete</Button>
        </div>
        <div className="flex gap-1.5">
            {visibleDates.map(date => (
                <Button
                    key={date.toISOString()}
                    disabled={isFuture(date)}
                    variant={habbit.completions.some(d => isSameDay(date, d)) ? "primary" : "secondary"}
                    onClick={() => toggleHabbit(habbit.id, date)}
                    className="flex flex-1 flex-col items-center gap-0.5 rounded-lg text-xs"
                >
                    <span className="font-medium">{format(date, "EEE")}</span>
                    <span className="text-zinc-400 text-sm">{format(date, "d")}</span>
                </Button>
            ))}
        </div>
    </div>
}
