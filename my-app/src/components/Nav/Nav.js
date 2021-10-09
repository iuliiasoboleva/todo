import React from 'react'
import { Link } from "react-router-dom"

function Nav() {
  
  return (
    <nav className="uk-navbar-container uk-margin">
      <div className="uk-navbar-left">

        <ul className="uk-navbar-nav">
          <li>
            <Link to="/">Info</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>

      </div>
    </nav>
  );
}

export default Nav
