import React from 'react';
import s from './Sidebar.module.scss'
import {ProfileContainer} from "../Profile/ProfileContainer";
import {PortfolioSetsContainer} from "../PortfolioSets/PortfolioSetsContainer";

export const Sidebar = (props) => {
    const {profile,portfolio,lastUpdated} = props;

    return (
        <div className={s.sidebar}>
            <ProfileContainer />
            <div className={s.filler}></div>
            <PortfolioSetsContainer />
        </div>
    );
};