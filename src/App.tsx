import React, { useState } from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import { Principal } from './models/principal';
import LandingPage from './components/LandingPage';


function App() {
  let [authUser, setAuthUser] = useState<Principal>();


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm currentUser={authUser} setCurrentUser={setAuthUser}/>}/>
          <Route path="/register" element={<RegisterForm/>}/>
          <Route path="/dashboard" element={<Dashboard currentUser={authUser} setCurrentUser={setAuthUser}/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
