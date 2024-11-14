import { createContext } from 'react';
import { Goal } from '../Utils/models';

interface GoalsContextProps {
  goals: Goal[];
  isGoalsLoading: boolean;
  addGoal: (goal: string) => Promise<void>;
  updateGoal: (goal: Goal) => Promise<void>;
  removeGoal: (id: number) => Promise<void>;
}

export const GoalsContext = createContext<GoalsContextProps>({
  goals: [],
  isGoalsLoading: false,
  addGoal: async () => {},
  updateGoal: async () => {},
  removeGoal: async () => {},
});
