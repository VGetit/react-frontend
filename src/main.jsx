import React, { StrictMode } from 'react'; // 1. Import React
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 2. Import BrowserRouter
import App from './App.jsx';

import './index.css'
import './styles/bootstrap.min.css';
import './styles/style.css';
import { AuthProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
