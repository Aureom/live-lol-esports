import React from "react";
import './navbarStyle.css'
import LoLLogo from '../../assets/images/league-of-legends.svg';

import {Link} from "react-router-dom";

export function Navbar() {
    return (
        <nav className="navbar-container">
            <Link className="navbar-logo" to="/">
                <img className="navbar-icon-img" src={LoLLogo} alt="League of legends logo"/>
                <h2  className="navbar-icon">Live Esports</h2>
            </Link>
        </nav>
    );
}