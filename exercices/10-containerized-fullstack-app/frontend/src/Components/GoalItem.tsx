import { useContext, useState } from 'react';
import { GoalsContext } from '../Store/GoalsContext';
import { Goal } from '../Utils/models';

interface IProps {
  goal: Goal;
  isEditing: boolean;
  setIsEditing: (id: number | null) => void;
}

export default function GoalItem({ goal, isEditing, setIsEditing }: IProps) {
  const [newGoal, setNewGoal] = useState(goal.text);
  const { removeGoal, updateGoal } = useContext(GoalsContext);

  const handleDelete = async () => {
    removeGoal(goal.id);
  };

  const handleUpdate = async (event: { key: string }) => {
    if (event.key === 'Enter') {
      await updateGoal(new Goal(goal.id, newGoal));
      setIsEditing(null);
    } else if (event.key === 'Escape') {
      setNewGoal(goal.text);
      setIsEditing(null);
    }
  };

  return (
    <li className='goal-item flex gap-3 pb-3 sm:py-4 justify-between items-center w-full'>
      {isEditing ? (
        <input
          type='text'
          className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
          value={newGoal}
          onChange={event => setNewGoal(event.target.value)}
          onKeyDown={handleUpdate}
        />
      ) : (
        <p
          className='text-sm font-medium text-white truncate cursor-pointer flex-grow hover:text-blue-500 hover:transition-colors'
          onClick={() => setIsEditing(goal.id)}
        >
          {goal.text}
        </p>
      )}
      <button onClick={handleDelete}>
        <svg
          className='w-4 h-4 text-blue-500 hover:text-red-500 transition-colors'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='none'
          viewBox='0 0 24 24'
        >
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M6 18 17.94 6M18 18 6.06 6'
          />
        </svg>
        <span className='sr-only'>Delete goal</span>
      </button>
    </li>
  );
}
