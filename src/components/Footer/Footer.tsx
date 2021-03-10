import React from "react";
import './styles/footerStyle.css'

import {ReactComponent as GitHubLogoSVG} from '../../assets/images/github.svg';
import {ReactComponent as TwitterLogoSVG} from '../../assets/images/twitter.svg';

export function Footer() {

    return (
        <nav className="footer-container">
            <a target="_blank" rel="noreferrer" href="https://github.com/Aureom">
                <GitHubLogoSVG className="footer-img"/>
            </a>
            <a target="_blank" rel="noreferrer" href="https://twitter.com/Aureom_">
                <TwitterLogoSVG  className="footer-img"/>
            </a>
        </nav>
    );
}