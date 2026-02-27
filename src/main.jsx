import { StrictMode } from 'react';  // Helps catch potential problems in development
import { createRoot } from 'react-dom/client'; // New way to render React 18+
import './index.css'; // Global styles
import { HelmetProvider } from "react-helmet-async";

import App from './App.jsx'; // Main App component

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </HelmetProvider>
);
