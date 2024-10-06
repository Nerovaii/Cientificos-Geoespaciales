import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './components/App';

const clientId = '497353850772-fo8emphujhd74mj21488tfic94gaicsi.apps.googleusercontent.com';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

console.log("Google Client ID:", clientId);
