import React from "react";
import './footerStyle.css'
import GithubLogo from '../../assets/images/github.svg';
import TwitterLogo from '../../assets/images/twitter.svg';

export function Footer() {
    return (
        <nav className="footer-container">
            <a target="_blank" rel="noreferrer" href="https://github.com/Aureom">
                <img className="footer-icon-img" src={GithubLogo} alt="League of legends logo"/>
            </a>
            <a target="_blank" rel="noreferrer" href="https://twitter.com/Aureom_">
                <img className="footer-icon-img" src={TwitterLogo} alt="League of legends logo"/>
            </a>
        </nav>
    );
}