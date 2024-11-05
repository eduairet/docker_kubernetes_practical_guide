import { createContext } from 'react';

interface GoalsContextProps {
  goals: string[];
  addGoal: (goal: string) => void;
}

export const GoalsContext = createContext<GoalsContextProps>({
  goals: [],
  addGoal: () => {},
});
