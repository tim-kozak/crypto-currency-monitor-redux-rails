import React from "react";
import s from "./AssetsPerformance.module.scss";
import {simpleDate, simplePrice} from "../../utils/decorators";

export const AssetsPerformance = (props) => {
    const {value, lastUpdated, maxDay, minDay} = props;

    return (<ul className={s.distribution}>
                <li>
                    <h5>Minimum value</h5>
                    <strong>{simplePrice(minDay.value)}</strong>
                    <span>on: {simpleDate(minDay.timestamp)}</span>
                </li>
                <li>
                    <h5>Current Set Value</h5>
                    <strong>{value}</strong>
                    <span>last updated: {simpleDate(lastUpdatedd)}</span>
                </li>
                <li>
                    <h5>Maximum value</h5>
                    <strong>{simplePrice(maxDay.value)}</strong>
                    <span>on: {simpleDate(maxDay.timestamp)}</span>
                </li>
            </ul>);
};