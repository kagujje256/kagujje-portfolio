import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

// Initialize smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Add class to body for styling
document.body.classList.add('bg-[#050505]');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
