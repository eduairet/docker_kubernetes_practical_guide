import AddGoalForm from './Components/AddGoalForm';
import Goals from './Components/Goals';

function App() {
  return (
    <main className='flex flex-col items-center min-h-screen w-full max-w-lg mx-auto pt-16 pb-32 gap-8'>
      <h1 className='text-4xl font-bold text-blue-500 text-center mb-4'>
        Docker Goals
      </h1>
      <AddGoalForm />
      <Goals />
    </main>
  );
}

export default App;
