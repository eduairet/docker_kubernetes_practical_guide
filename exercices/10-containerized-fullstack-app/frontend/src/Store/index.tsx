import { ReactNode } from 'react';
import GoalsProvider from './GoalsProvider';

interface IProps {
  children: ReactNode;
}

export default function Store({ children }: IProps) {
  return <GoalsProvider>{children}</GoalsProvider>;
}
