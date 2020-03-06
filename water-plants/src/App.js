import React from 'react';
import './App.css';
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import CreatePlant from "./Components/CreatePlant";
import Welcome from "./Components/Welcome";
import { Link, Switch, Route } from "react-router-dom";
function App() {
  return (
  <div className="App">
    <nav className='navi'>
     <h1 className="PQ-header">  Plant Quencher  </h1>
      <div className="nav-links">
          <Link className="nav-links" to="/"> Home </Link>
          <Link className="nav-links" to="/SignUp"> Sign Up </Link>
          <Link className='nav-links' to="/login"> Log In</Link>
          <Link className='nav-links' to="/CreatePlant"> My Plants</Link>
         
      </div>
   </nav>
      <Switch>
        <Route exact path="/" component= {Welcome}/>
        <Route exact path="/SignUp"> <SignUp /> </Route>
        <Route exact path="/Login"> <Login /> </Route>
        <Route path="/Log/:plantID">  </Route>
        <Route path="/CreatePlant"> <CreatePlant /> </Route>

      </Switch>
   
    </div>
  );
}
export default App;