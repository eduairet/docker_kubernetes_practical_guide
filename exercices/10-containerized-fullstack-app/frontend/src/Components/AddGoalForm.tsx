import { useState, useContext } from 'react';
import { GoalsContext } from '../Store/GoalsContext';

export default function AddGoalForm() {
  const [newGoal, setNewGoal] = useState('');
  const { addGoal } = useContext(GoalsContext);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await addGoal(newGoal);
    setNewGoal('');
  };

  return (
    <form className='max-w-md w-full mx-auto' onSubmit={handleSubmit}>
      <div className='mb-5'>
        <label
          htmlFor='goal'
          className='block mb-2 text-sm font-medium text-white'
        >
          New Goal
        </label>
        <input
          type='text'
          id='goal'
          className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
          placeholder='Learn about Docker Volumes'
          value={newGoal}
          onChange={event => setNewGoal(event.target.value)}
          required
        />
      </div>
      <button
        type='submit'
        className='text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800'
      >
        Add Goal
      </button>
    </form>
  );
}
