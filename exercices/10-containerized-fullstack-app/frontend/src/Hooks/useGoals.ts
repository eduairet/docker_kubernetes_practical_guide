import { useState, useEffect } from 'react';
import { postGoal, putGoal, deleteGoal, getGoals } from '../Utils';
import { Goal } from '../Utils/models';

export default function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);

  const fetchGoals = async () => {
    const response = await getGoals();
    if (response.success) setGoals(response.result as Goal[]);
    else alert(response.message);
  };

  const addGoal = async (goal: string) => {
    const response = await postGoal(goal);
    if (response.success) await fetchGoals();
    else alert(response.message);
  };

  const updateGoal = async (goal: Goal) => {
    const response = await putGoal(goal);
    if (response.success) await fetchGoals();
    else alert(response.message);
  };

  const removeGoal = async (id: number) => {
    const response = await deleteGoal(id);
    if (response.success) await fetchGoals();
    else alert(response.message);
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return { goals, addGoal, updateGoal, removeGoal };
}
