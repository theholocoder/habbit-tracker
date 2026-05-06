import { useState } from "react";
import HabbitForm from "./components/HabbitForm"
import HabbitList from "./components/HabbitList"
import Header from "./components/Header"
import HabbitProvider from "./context/HabbitProvider";
import { addWeeks, eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";

export default function App() {
    const [weekOffset, setWeekOffset] = useState(0);
    const week = addWeeks(new Date(), weekOffset);
    const visibleDates = eachDayOfInterval({
        start: startOfWeek(week, { weekStartsOn: 1 }),
        end: endOfWeek(week, { weekStartsOn: 1 })
    });

    function onPreviousWeek() {
        setWeekOffset(weekOffset - 1);
    }

    function onNextWeek() {
        setWeekOffset(weekOffset + 1);
    }

    return <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
        <HabbitProvider>
            <Header
                visibleDates={visibleDates}
                onPreviousWeek={onPreviousWeek}
                onNextWeek={onNextWeek} />
            <HabbitForm />
            <HabbitList visibleDates={visibleDates} />
        </HabbitProvider>
    </div>
}


