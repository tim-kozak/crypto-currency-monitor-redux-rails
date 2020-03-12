import React, {useState} from 'react';
import s from './AssetsList.module.scss'
import {simpleDate, simplePrice, simpleValue} from "../../utils/decorators";

export const AssetsList = (props) => {
    const {assets, currencies, value, lastUpdated, maxDay} = props;
    const colorScheme = ["#ffa600", "#ff6361","#58508d"];
    const [state, setState] = useState({
        isEditing: false
    });

    const handleEdit = () => {
        setState({
            isEditing: !state.isEditing
        })
    };


    return (
        <div className={s.list}>
            <ul className={s.assets}>
                {assets.map(function(asset,index) {
                    const currency = currencies.byIds[asset.currency_id];
                    const assetName = currency.name;
                    const amount = simpleValue(asset ? asset.amount : 0, 3);
                    const value = simplePrice(currency.price * amount,1);
                    return (<li>
                                <div>
                                    <span style={{ backgroundColor: colorScheme[index]}}>{assetName}:</span>
                                </div>
                                {state.isEditing ? (<input type="text" value={amount}/>) : (<span className={s.amount} onClick={handleEdit}>{amount}</span>)}
                                <strong className={s.value}>{value}</strong>
                            </li>);
                })}
            </ul>
            <ul className={s.distribution}>
                <li>
                    <h5>Current Set Value</h5>
                    <strong>{value}</strong>
                    <span>last updated: {lastUpdated}</span>
                </li>
                <li>
                    <h5>Max possible value</h5>
                    <strong>{simplePrice(maxDay.value)}</strong>
                    <span>on: {simpleDate(maxDay.timestamp)}</span>
                </li>
            </ul>
        </div>
    );
};