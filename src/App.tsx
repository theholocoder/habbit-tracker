import HabbitForm from "./components/HabbitForm"
import HabbitList from "./components/HabbitList"
import Header from "./components/Header"
import HabbitProvider from "./context/HabbitProvider";

export default function App() {
    return <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
        <HabbitProvider>
            <Header />
            <HabbitForm />
            <HabbitList />
        </HabbitProvider>
    </div>
}


