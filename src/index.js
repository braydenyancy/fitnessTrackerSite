import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import { getActivities, getRoutines, getUserRoutines, } from './api';
import './style.css';
import {
  Home,
  Login,
  Navbar,
  Register,
  Profile,
  Routines,
  MyRoutines,
  MakeRoutine,
  EditRoutine,
  Activities,
  MakeActivity,
  EditActivity,
  AddActivity
} from './components';

const App = () => {

  const [activities, setActvities] = useState([])
  const [routines, setRoutines] = useState([])
  const [userRoutines, setUserRoutines] = useState([])
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [regErrorMessage, setRegErrorMessage] = useState('');
  const [actErrorMessage, setActErrorMessage] = useState('');
  const [createRErrorMessage, setCreateRErrorMessage] = useState('');
  const [editRErrorMessage, setEditRErrorMessage] = useState('');

  const navigate = useNavigate();

  function logout() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('username')
    setActErrorMessage('');
    setRegErrorMessage('');
    setLoginErrorMessage('');
    setCreateRErrorMessage('');
    setEditRErrorMessage('');
    setToken('');
    setUser({});
  }

  async function fetchActivities() {
    const results = await getActivities()
    // console.log(results)
    setActvities(results)
  }

  async function fetchRoutines() {
    const results = await getRoutines()
    setRoutines(results)
  }

  async function fetchUserRoutines() {
    let token = window.localStorage.getItem('token')
    let username = window.localStorage.getItem('username')
    const results = await getUserRoutines(token, username)
    // console.log(results)
    setUserRoutines(results)
  }

  useEffect(() => {
    fetchActivities();
  }, [])

  useEffect(() => {
    fetchRoutines();
  }, [])

  useEffect(() => {
    fetchUserRoutines();
  }, [token])

  return (
    <div>
      <Navbar
        logout={logout}
        token={token}
        user={user} />
      <Routes>
        <Route
          path='/home'
          element={<Home
            fetchActivities={fetchActivities}
            fetchRoutines={fetchRoutines}
            fetchUserRoutines={fetchUserRoutines}
          />}
        />
        <Route
          path='/'
          element={<Home
            token={token}
          />}
        />
        <Route
          path='/register'
          element={<Register
            setToken={setToken}
            token={token}
            navigate={navigate}
            setRegErrorMessage={setRegErrorMessage}
            regErrorMessage={regErrorMessage}
          />}
        />
        <Route
          path='/login'
          element={<Login
            setToken={setToken}
            navigate={navigate}
            isLoggedIn={isLoggedIn}
            setLoginErrorMessage={setLoginErrorMessage}
            loginErrorMessage={loginErrorMessage}
            setIsLoggedIn={setIsLoggedIn}
          />}
        />
        <Route
          path='/profile'
          element={<Profile user={user} />}
        />
        <Route
          path='/routines'
          element={<Routines
            setToken={setToken}
            navigate={navigate}
            routines={routines}
            fetchRoutines={fetchRoutines}
          />}
        />
        <Route
          path='/myRoutines'
          element={<MyRoutines
            setToken={setToken}
            navigate={navigate}
            userRoutines={userRoutines}
            fetchUserRoutines={fetchUserRoutines}
            fetchRoutines={fetchRoutines}
          // isLoggedIn={isLoggedIn}
          // setIsLoggedIn={setIsLoggedIn}
          />}
        />
        <Route
          path='/createRoutine'
          element={<MakeRoutine
            setToken={setToken}
            navigate={navigate}
            routines={routines}
            fetchRoutines={fetchRoutines}
            fetchUserRoutines={fetchUserRoutines}
            createRErrorMessage={createRErrorMessage}
            setCreateRErrorMessage={setCreateRErrorMessage}
          // isLoggedIn={isLoggedIn}
          // setIsLoggedIn={setIsLoggedIn}
          />}
        />
        <Route
          path='/routines/:routineId'
          element={<EditRoutine
            routines={routines}
            setToken={setToken}
            navigate={navigate}
            fetchRoutines={fetchRoutines}
            fetchUserRoutines={fetchUserRoutines}
            editRErrorMessage={editRErrorMessage}
            setEditRErrorMessage={setEditRErrorMessage}
          // isLoggedIn={isLoggedIn}
          // setIsLoggedIn={setIsLoggedIn}
          />}
        />
        <Route
          path='/activities'
          element={<Activities
            activities={activities}
            setToken={setToken}
            navigate={navigate}
            fetchActivities={fetchActivities}
          // isLoggedIn={isLoggedIn}
          // setIsLoggedIn={setIsLoggedIn}
          />}
        />
        <Route
          path='/createActivity'
          element={<MakeActivity
            activities={activities}
            setToken={setToken}
            navigate={navigate}
            fetchActivities={fetchActivities}
            actErrorMessage={actErrorMessage}
            setActErrorMessage={setActErrorMessage}
          />}
        />
        <Route
          path='/editActivity'
          element={<EditActivity
            activities={activities}
            setToken={setToken}
            navigate={navigate}
            userRoutines={userRoutines}
            fetchUserRoutines={fetchUserRoutines}
          />}
        />
        <Route
          path='/routines/:routineId/activities'
          element={<AddActivity
            activities={activities}
            setToken={setToken}
            navigate={navigate}
            fetchRoutines={fetchRoutines}
            fetchUserRoutines={fetchUserRoutines}
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
