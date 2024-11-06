import { useContext } from 'react';
import { GoalsContext } from '../Store/GoalsContext';
import GoalItem from './GoalItem';

export default function Goals() {
  const { goals } = useContext(GoalsContext);

  return (
    <section className='flex flex-col gap-4 w-full items-center justify-center'>
      <h2 className='text-2xl font-bold text-center text-blue-500'>My Goals</h2>
      <div className='max-w-md w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
        <ul className='"max-w-md divide-y divide-gray-200 dark:divide-gray-700'>
          {goals.length > 1 ? (
            goals.map(goal => <GoalItem key={`goal-${goal.id}`} goal={goal} />)
          ) : (
            <p className='text-gray-500 text-center'>No goals yet</p>
          )}
        </ul>
      </div>
    </section>
  );
}
