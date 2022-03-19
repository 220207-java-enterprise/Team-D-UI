import React, { useState } from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { Principal } from './models/principal';


function App() {
  let [authUser, setAuthUser] = useState<Principal>();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login currentUser={authUser} setCurrentUser={setAuthUser}/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
