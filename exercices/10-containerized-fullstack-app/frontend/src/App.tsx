import { useState } from 'react';

function App() {
  const [goals, setGoals] = useState<string[]>([]);
  const [newGoal, setNewGoal] = useState('');

  const addGoalHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setGoals(prevGoals => [...prevGoals, newGoal]);
    setNewGoal('');
  };

  return (
    <main>
      <h1>Docker Goals</h1>
      <form onSubmit={addGoalHandler}>
        <input
          type='text'
          value={newGoal}
          onChange={event => setNewGoal(event.target.value)}
        />
        <button>Add Goal</button>
      </form>
      <ul>
        {goals.map((goal, index) => (
          <li key={index}>{goal}</li>
        ))}
      </ul>
    </main>
  );
}

export default App;
