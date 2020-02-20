import React from 'react';
import s from './PortfolioDetails.module.scss'
import {AssetsList} from "../AssetsList/AssetsList";
import {PortfolioChart} from "../PortfolioChart/PortfolioChart";
import {OverviewContainer} from "../Overview/OverviewContainer";
import {Loader} from "../common/Loader";

export const PortfolioDetails = (props) => {
    const {portfolioItem, currencies, yAxis, data, maxDay, portfolioValue,lastUpdated, isLoading} = props;

    const portfolioName = portfolioItem.name;
    const assets = portfolioItem.assets;
    if (isLoading) return <Loader />;

    return (
        <div className={s.content}>
            <div className={s.details}>
                <h2>{portfolioName} <span>Portfolio Assets</span></h2>
                <PortfolioChart data={data} yAxis={yAxis} />
                <div className={s.distribution}>
                    <AssetsList assets={assets} currencies={currencies} value={portfolioValue} lastUpdated={lastUpdated} maxDay={maxDay} />
                    <div className=""></div>
                </div>
            </div>
            <div className={s.overview}>
                <h2>Assets distribution</h2>
                <OverviewContainer />
            </div>
        </div>
    );
};