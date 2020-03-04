import React from 'react';
import './App.css';
import Header from "./Components/Header";
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
          <Link className="nav-links" to="/SignUp"> SignUp </Link>
          <Link className='nav-links' to="/login"> Log In</Link>
      </div>
   </nav>
        {/* <div className='Sign'> <SignUp/>  </div>
        <div className='Log'> <Login/> <br></br> <a href='https://soundcloud.com/v-hines'>Forgot Password?</a> </div>
     */}
      <Switch>
        <Route exact path="/" component= {Welcome}/>
        <Route exact path="/SignUp"> <SignUp /> </Route>
        <Route exact path="/Login"> <Login /> </Route>
        <Route path="/Log/:plantID">  </Route>
      </Switch>
      {/* <CreatePlant /> */}
    </div>
  );
}
export default App;