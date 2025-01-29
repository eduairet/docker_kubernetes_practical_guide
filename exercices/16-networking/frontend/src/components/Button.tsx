interface IProps {
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({ onClick, children, type }: IProps) {
  return (
    <button
      type={type || 'button'}
      onClick={onClick}
      className='cursor-pointer px-3 py-2 bg-black text-white rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary hover:bg-secondary hover:text-black transition-colors duration-300'
    >
      {children}
    </button>
  );
}
