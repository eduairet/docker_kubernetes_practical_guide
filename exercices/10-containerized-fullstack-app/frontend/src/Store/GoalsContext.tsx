import { createContext } from 'react';
import { Goal } from '../Utils/models';

interface GoalsContextProps {
  goals: Goal[];
  addGoal: (goal: string) => Promise<void>;
  updateGoal: (goal: Goal) => Promise<void>;
  removeGoal: (id: number) => Promise<void>;
}

export const GoalsContext = createContext<GoalsContextProps>({
  goals: [],
  addGoal: async () => {},
  updateGoal: async () => {},
  removeGoal: async () => {},
});
