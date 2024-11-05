import { ReactNode } from 'react';
import useGoals from '../Hooks/useGoals';
import { GoalsContext } from './GoalsContext';

interface IProps {
  children: ReactNode;
}

export default function GoalsProvider({ children }: IProps) {
  const { goals, addGoal } = useGoals();

  return (
    <GoalsContext.Provider value={{ goals, addGoal }}>
      {children}
    </GoalsContext.Provider>
  );
}
