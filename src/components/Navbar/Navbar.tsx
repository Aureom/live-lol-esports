import React from "react";
import './styles/navbarStyle.css'
import {ReactComponent as LoLLogoSVG} from '../../assets/images/league-of-legends.svg';

import {Link} from "react-router-dom";
import { ThemeToggler } from "./ThemeToggler";

export function Navbar() {
    return (
        <nav className="navbar-container">
            <div className="navbar-logo-container">
                <Link className="navbar-logo" to="/">
                    <LoLLogoSVG className="navbar-icon-img"/>
                    <h2 className="navbar-icon">Live Esports</h2>
                </Link>
            </div>
            <ThemeToggler/>
        </nav>
    );
}