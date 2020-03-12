import React from 'react';
import s from './Header.module.scss'
import icon from './img/logo.jpg'

export const Header = (props) => {
    return (
        <header className={s.header}>
            <h1 className={s.title}>Monitor</h1>
            <img src={icon} alt="" />
            <a href="#" className={s.settings}>Settings <span>☑</span></a>
        </header>
    );
};