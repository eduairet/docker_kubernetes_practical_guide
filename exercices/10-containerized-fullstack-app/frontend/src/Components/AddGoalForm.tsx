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
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
        >
          New Goal
        </label>
        <input
          type='text'
          id='goal'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Learn about Docker Volumes'
          value={newGoal}
          onChange={event => setNewGoal(event.target.value)}
          required
        />
      </div>
      <button
        type='submit'
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        Add Goal
      </button>
    </form>
  );
}
