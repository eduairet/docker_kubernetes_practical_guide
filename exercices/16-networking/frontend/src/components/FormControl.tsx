interface IProps {
  id: string;
  label: string;
  value?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormControl({
  id,
  label,
  value,
  placeholder,
  onChange,
}: IProps) {
  return (
    <div className='flex flex-col bg-white p-4 rounded-md w-full'>
      <label className='text-sm font-semibold text-black' htmlFor={id}>
        {label}
      </label>
      <input
        className='text-black w-full p-2 mt-1 rounded-md bg-secondary transition focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white focus:border-transparent'
        type='text'
        id={id}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      ></input>
    </div>
  );
}
