import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.div`
display: flex;
justify-content: space-evenly;
`
const Button = styled.button`
border-radius: 9px;
color: black;
background-color: yellow;
font-size: 20px;
height: 40px;
width: 150px;
border: 4px solid green;
`

export default function Header() {
  return (
    <header className="ui centered">
      <h1 className="ui center">Water My Plants</h1>

      <Nav>
        <Link to='/'><Button>Home</Button></ Link>
        <Link to='/signup'><Button>Sign Up</Button></Link>
        <Link to='/profile'><Button>Profile</Button></Link>
      </Nav>
    </header>
  )
}
