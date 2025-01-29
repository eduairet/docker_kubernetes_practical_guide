import { useState } from 'react';
import { Task } from '@/shared/types';
import FormControl from './FormControl';
import Button from './Button';

interface IProps {
  onAddTask: (task: Task) => void;
}

export default function NewTask({ onAddTask }: IProps) {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredText, setEnteredText] = useState('');

  function submitForm(event: React.FormEvent) {
    event.preventDefault();
    if (
      enteredTitle &&
      enteredTitle.trim().length > 0 &&
      enteredText &&
      enteredText.trim().length > 0
    ) {
      onAddTask({ title: enteredTitle, text: enteredText });
      setEnteredTitle('');
      setEnteredText('');
    }
  }

  return (
    <form
      className='flex flex-col items-center gap-5 mb-10'
      onSubmit={submitForm}
    >
      <FormControl
        id='title'
        label='Title'
        value={enteredTitle}
        onChange={event => setEnteredTitle(event.target.value)}
      />
      <FormControl
        id='text'
        label='Text'
        value={enteredText}
        onChange={event => setEnteredText(event.target.value)}
      />
      <Button
        type='submit'
        onClick={() => {
          console.log('Adding task...');
        }}
      >
        Add Task
      </Button>
    </form>
  );
}
