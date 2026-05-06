import { createContext, useContext } from "react";
import type { Habbit } from "../models/habbit";

type Context = {
  habbits: Habbit[];
  addHabbit: (name: string) => void;
  removeHabbit: (id: string) => void;
  toggleHabbit: (id: string, date: Date) => void;
};

export const HabbitContext = createContext<null | Context>(null);

export function useHabbits() {
  const context = useContext(HabbitContext);
  if (context === null) {
    throw new Error("useHabbits must be used within a HabbitProvider");
  }

  return context;
}
