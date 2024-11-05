interface IProps {
  text: string;
}

export default function Goal({ text }: IProps) {
  return (
    <li className='pb-3 sm:py-4'>
      <p className='text-sm font-medium text-gray-900 truncate dark:text-white'>
        {text}
      </p>
    </li>
  );
}
