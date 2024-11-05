import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import Store from './Store/index.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Store>
      <App />
    </Store>
  </StrictMode>
);
