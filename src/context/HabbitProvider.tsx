import { useState, type ReactNode } from "react";
import type { Habbit } from "../models/habbit";
import { isSameDay } from "date-fns";
import { HabbitContext } from "./useHabbit";

type HabbitProviderProps = {
    children: ReactNode,
}

export default function HabbitProvider({ children }: HabbitProviderProps) {
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

    return <HabbitContext value={{ habbits, addHabbit, removeHabbit, toggleHabbit }}>{children}</HabbitContext>
}

