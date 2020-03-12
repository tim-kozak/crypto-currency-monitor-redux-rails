import React from 'react';
import s from './Overview.module.scss'
import {OverviewPie} from "../OverviewPie/OverviewPie";

export const Overview = (props) => {
    const {data} = props;

    return (
        <div className="overview">
            <div className="distribution">

            </div>
            <div className="growth">
                <OverviewPie data={data}/>
            </div>
        </div>
    );
};