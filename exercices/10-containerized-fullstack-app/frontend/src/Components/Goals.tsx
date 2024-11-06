import { useState, useContext, useEffect } from 'react';
import { GoalsContext } from '../Store/GoalsContext';
import GoalItem from './GoalItem';

export default function Goals() {
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const { goals } = useContext(GoalsContext);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('.goal-item')) {
        setIsEditing(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <section className='flex flex-col gap-4 w-full items-center justify-center'>
      <h2 className='text-2xl font-bold text-center text-blue-500'>My Goals</h2>
      <div className='max-w-md w-full p-6 rounded-lg shadow bg-gray-800 border-gray-700'>
        <ul className='"max-w-md divide-y divide-gray-700'>
          {goals.length > 1 ? (
            goals.map(goal => (
              <GoalItem
                key={`goal-${goal.id}`}
                goal={goal}
                isEditing={isEditing === goal.id}
                setIsEditing={setIsEditing}
              />
            ))
          ) : (
            <p className='text-gray-500 text-center'>No goals yet</p>
          )}
        </ul>
      </div>
    </section>
  );
}
