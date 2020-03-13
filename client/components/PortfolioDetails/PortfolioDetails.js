import React,{useState,useEffect} from 'react';
import s from './PortfolioDetails.module.scss'
import {AssetsList} from "../AssetsList/AssetsList";
import {PortfolioChart} from "../PortfolioChart/PortfolioChart";
import {PortfolioHeader} from "./components/PortfolioHeader";
import {AssetsPerformance} from "../AssetsPerformance/AssetsPerformance";
import {OverviewPie} from "../OverviewPie/OverviewPie";

export const PortfolioDetails = (props) => {
    const {portfolioItem, currencies, yAxis, data, pieData, maxDay, portfolioValue,lastUpdated, handleUpdatePortfolioName,handleDeletePortfolio,handleAddAsset} = props;

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
                <AssetsPerformance value={portfolioValue} lastUpdated={lastUpdated} maxDay={maxDay} />
            </div>
            <div className={s.overview}>
                <h2>Assets distribution</h2>
                <div className="overview">
                    <div className="growth">
                        <OverviewPie data={pieData}/>
                    </div>
                    <div className="distribution">
                        <AssetsList assets={assets} currencies={currencies} handleAddAsset={handleAddAsset} />
                    </div>
                </div>
            </div>
        </div>
    );
};