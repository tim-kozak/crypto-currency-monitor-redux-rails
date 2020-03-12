import React from 'react'
import loader from './img/loader.gif'
import s from './Loader.module.scss'

export const Loader = (props) => {
    return <div className={s.loader}><img src={loader} alt=""/></div>;
};
