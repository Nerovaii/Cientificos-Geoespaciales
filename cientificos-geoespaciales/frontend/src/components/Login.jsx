import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import '../styles/Login.css';
import logo from '../assets/logo.png';

function Login() {
  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      localStorage.setItem('authToken', tokenResponse.access_token); // Guardamos el token en localStorage
      window.location.href = '/landing'; // Redirige al landing después de iniciar sesión
    },
    onError: () => {
      console.log('Error de autenticación');
    }
  });

  return (
    <div className='header'>
      <h1>
      <img src={logo} alt="Logo" className="logo" />
        SpeculApp
      </h1>
      <button onClick={() => login()} className='cta'>
        <span>Iniciar sesión</span>
        <svg width="15px" height="10px" viewBox="0 0 13 10">
          <path d="M1,5 L11,5"></path>
          <polyline points="8 1 12 5 8 9"></polyline>
        </svg>
      </button>
    </div>
  );
}

export default Login;
