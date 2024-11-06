const API_URL = 'http://localhost:5035';

export const apiRoutes = {
  getGoals: `${API_URL}/goals`,
  getGoal(id: number) {
    return `${API_URL}/goals/${id}`;
  },
  addGoal: `${API_URL}/goals`,
  updateGoal: `${API_URL}/goals`,
  deleteGoal(id: number) {
    return `${API_URL}/goals/${id}`;
  },
};
