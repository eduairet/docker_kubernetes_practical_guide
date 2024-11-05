import { useState, useEffect } from 'react';
import { getGoals } from '../Utils';

//TODO: Implement API calls
export default function useGoals() {
  const [goals, setGoals] = useState<string[]>([]);

  useEffect(() => {
    setGoals(getGoals());
  }, []);

  const addGoal = (goal: string) => {
    setGoals(prevGoals => [...prevGoals, goal]);
  };

  return { goals, addGoal };
}
