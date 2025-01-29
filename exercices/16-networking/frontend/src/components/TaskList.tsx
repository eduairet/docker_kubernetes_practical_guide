import { Task } from '@/shared/types';

interface IProps {
  tasks: Array<Task>;
}

export default function TaskList({ tasks }: IProps) {
  return (
    <ul className='w-full max-w-80 mx-auto mt-2 flex flex-col gap-5 text-center bg-secondary p-5 rounded-md'>
      {!tasks.length ? (
        <li>
          <p className='text-black'>No tasks yet...</p>
        </li>
      ) : (
        tasks.map(task => (
          <li key={task.title} className='flex flex-col p-4 rounded-md w-full'>
            <h2 className='text-lg font-semibold text-black'>{task.title}</h2>
            <p className='text-black'>{task.text}</p>
          </li>
        ))
      )}
    </ul>
  );
}
