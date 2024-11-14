import { useState, useEffect } from 'react';
import { postGoal, putGoal, deleteGoal, getGoals } from '../Utils';
import { Goal } from '../Utils/models';

export default function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isGoalsLoading, setIsGoalsLoading] = useState<boolean>(false);

  const fetchGoals = async () => {
    setIsGoalsLoading(true);
    const response = await getGoals();
    if (response.success) setGoals(response.result as Goal[]);
    else alert(response.message);
    setIsGoalsLoading(false);
  };

  const addGoal = async (goal: string) => {
    setIsGoalsLoading(true);
    const response = await postGoal(goal);
    if (response.success) await fetchGoals();
    else alert(response.message);
    setIsGoalsLoading(false);
  };

  const updateGoal = async (goal: Goal) => {
    setIsGoalsLoading(true);
    const response = await putGoal(goal);
    if (response.success) await fetchGoals();
    else alert(response.message);
    setIsGoalsLoading(false);
  };

  const removeGoal = async (id: number) => {
    setIsGoalsLoading(true);
    const response = await deleteGoal(id);
    if (response.success) await fetchGoals();
    else alert(response.message);
    setIsGoalsLoading(false);
  };

  useEffect(() => {
    try {
      fetchGoals();
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unknown error occurred');
      }
    }
  }, []);

  return { goals, isGoalsLoading, addGoal, updateGoal, removeGoal };
}
