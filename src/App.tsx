import { useState } from "react";
import HabbitForm from "./components/HabbitForm"
import HabbitList, { type Habbit } from "./components/HabbitList"
import Header from "./components/Header"
import { isSameDay } from "date-fns";

export default function App() {
    const [habbits, setHabbits] = useState<Habbit[]>([]);

    function addHabbit(name: string) {
        setHabbits(habbits => [...habbits, { id: crypto.randomUUID(), name, completions: [] }]);
    }

    function removeHabbit(id: string) {
        setHabbits(habbits => habbits.filter(habbit => habbit.id !== id));
    }

    function toggleHabbit(id: string, date: Date) {
        setHabbits(habbits => habbits.map(habbit => {
            if (habbit.id !== id) {
                return habbit;
            }

            const completed = habbit.completions.some(d => isSameDay(d, date));
            const completions = completed ? [...habbit.completions.filter(d => !isSameDay(d, date))] : [...habbit.completions, date];

            return { ...habbit, completions };
        }));
    }

    return <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
        <Header />
        <HabbitForm addHabbit={addHabbit} />
        <HabbitList habbits={habbits} toggleHabbit={toggleHabbit} removeHabbit={removeHabbit} />
    </div>
}


