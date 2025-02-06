import { useState, useEffect, useCallback } from 'react';
import TheTaskEye from '@/components/TheTaskEye';
import { Task } from '@/shared/types';
import TaskList from '@/components/TaskList';
import NewTask from '@/components/NewTask';
import Button from '@/components/Button';

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = useCallback(function () {
    fetch('/api/tasks', {
      headers: {
        Authorization: 'Bearer abc',
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        setTasks(jsonData.tasks);
      });
  }, []);

  useEffect(
    function () {
      fetchTasks();
    },
    [fetchTasks]
  );

  function addTaskHandler(task: Task) {
    fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer abc',
      },
      body: JSON.stringify(task),
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (resData) {
        console.log(resData);
      });
  }

  return (
    <main className='flex flex-col bg-gradient-to-b from-secondary to-transparent items-center w-full mx-auto pt-10 mb-20'>
      <header className='flex flex-col items-center w-full max-w-80 '>
        <h1 className='text-5xl font-bold text-center text-black'>
          The Task Eye
        </h1>
        <picture>
          <TheTaskEye />
          <span className='sr-only'>The Task Eye Logo</span>
        </picture>
      </header>
      <section className='w-full max-w-80 '>
        <NewTask onAddTask={addTaskHandler} />
      </section>
      <section className='w-full max-w-80 flex flex-col items-center gap-2 bg-white p-5 rounded-md'>
        <Button onClick={fetchTasks}>Fetch Tasks</Button>
        <TaskList tasks={tasks} />
      </section>
    </main>
  );
}

export default App;
