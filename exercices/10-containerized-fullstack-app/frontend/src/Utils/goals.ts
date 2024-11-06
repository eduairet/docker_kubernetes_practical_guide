import { apiRoutes } from './api-urls';
import { fetchData } from './fetch';
import { Goal } from './models';

export const getGoals = () => {
  return fetchData<Goal[]>(apiRoutes.getGoals, { method: 'GET' });
};

export const getGoal = (id: number) => {
  return fetchData<Goal>(apiRoutes.getGoal(id), { method: 'GET' });
};

export const postGoal = (text: string) => {
  return fetchData(apiRoutes.addGoal, {
    method: 'POST',
    body: { text },
  });
};

export const putGoal = (goal: Goal) => {
  return fetchData(apiRoutes.updateGoal, {
    method: 'PUT',
    body: { ...goal },
  });
};

export const deleteGoal = (id: number) => {
  return fetchData(apiRoutes.deleteGoal(id), { method: 'DELETE' });
};
