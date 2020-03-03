import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="ui centered">
      <h1 className="ui center">Water My Plants</h1>
      <nav>
        <button>Home</button>
        <button>Signup</button>
        <button>Login</button>
      </nav>
    </header>
  );
}
