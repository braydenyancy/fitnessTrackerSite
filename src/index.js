import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import './style.css';
import {
  Home,
  Login,
  Navbar,
  Register,
  Profile
} from './components';

const App = () => {

  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  function logout() {
    window.localStorage.removeItem('token');
    setToken('');
    setUser({});
  }

  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={<Home
          />}
        />
        <Route 
          path='/login'
          element={ <Login 
            setToken={ setToken }
            navigate={ navigate }
          />}
        />
      </Routes>
    </div>
  );
}

const container = document.querySelector('#container')
const root = ReactDOM.createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
