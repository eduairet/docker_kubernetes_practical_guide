import { useContext } from 'react';
import { GoalsContext } from '../Store/GoalsContext';
import { Goal } from '../Utils/models';

interface IProps {
  goal: Goal;
}

export default function GoalItem({ goal }: IProps) {
  const { removeGoal } = useContext(GoalsContext);

  const handleDelete = async () => {
    removeGoal(goal.id);
  };

  return (
    <li className='flex pb-3 sm:py-4 justify-between items-center'>
      <p className='text-sm font-medium text-gray-200 truncate '>{goal.text}</p>
      <button onClick={handleDelete}>
        <svg
          className='w-4 h-4 text-blue-500'
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
      </button>
    </li>
  );
}
