import React,{useState,useEffect} from 'react';
import s from './PortfolioDetails.module.scss'
import {AssetsList} from "../AssetsList/AssetsList";
import {PortfolioChart} from "../PortfolioChart/PortfolioChart";
import {OverviewContainer} from "../Overview/OverviewContainer";
import {Loader} from "../common/Loader";
import {PortfolioHeader} from "./components/PortfolioHeader";

export const PortfolioDetails = (props) => {
    const {portfolioItem, currencies, yAxis, data, maxDay, portfolioValue,lastUpdated, handleUpdatePortfolioName,handleDeletePortfolio} = props;

    const portfolioName = portfolioItem.name;
    const portfolioId = portfolioItem.id;
    const assets = portfolioItem.assets;

    const handleTitleChange = (newName) => {
        handleUpdatePortfolioName(newName,portfolioItem.id);
    };

    return (
        <div className={s.content}>
            <div className={s.details}>
                <PortfolioHeader
                    title={portfolioName}
                    subtitle="Portfolio Assets"
                    canEdit={!!portfolioId}
                    handleTitleChange={handleTitleChange}
                    handleDelete={ ()=>handleDeletePortfolio(portfolioId) }
                />
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