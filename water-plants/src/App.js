import React from 'react';
import './App.css';
import Header from "./Components/Header";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Profile from "./Components/Profile"
import { Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Header />
      <div className="signupLogin">
      <SignUp />
      <Login />
      </div>
    
    </div>
  );
}

export default App;
