import React from 'react';
import './App.css';
import Header from "./Components/Header";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import CreatePlant from "./Components/CreatePlant";
import Welcome from "./Components/Welcome";
import { Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Header />
      <Route exact path="/"><Welcome /></Route>
      <Route path="/login"><Login /></Route>
      <Route path="/signup"><SignUp /></Route>
      <Route path="/myplants"><CreatePlant /></Route>
    </div>
  );
}

export default App;
