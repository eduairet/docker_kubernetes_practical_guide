import { ReactNode } from 'react';
import useGoals from '../Hooks/useGoals';
import { GoalsContext } from './GoalsContext';

interface IProps {
  children: ReactNode;
}

export default function GoalsProvider({ children }: IProps) {
  const { goals, isGoalsLoading, addGoal, updateGoal, removeGoal } = useGoals();

  return (
    <GoalsContext.Provider value={{ goals, isGoalsLoading, addGoal, updateGoal, removeGoal }}>
      {children}
    </GoalsContext.Provider>
  );
}
