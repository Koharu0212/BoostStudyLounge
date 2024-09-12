import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './state/AuthContext';
import ModalProvider from './state/ModalProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <ModalProvider>
      <App />
      </ModalProvider>
    </AuthContextProvider>
  </React.StrictMode>
);