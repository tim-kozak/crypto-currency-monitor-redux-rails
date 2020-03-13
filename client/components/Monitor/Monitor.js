import React from 'react';
import s from './Monitor.module.scss'
import { Sparklines, SparklinesBars,SparklinesLine } from 'react-sparklines';
import {simplePrice} from "../../utils/decorators";
import {Loader} from "../common/Loader";
import {colorForIndex, tintForIndex} from "../../utils/colors";

export const Monitor = (props) => {
    const {currencies, isLoading} = props;

    if (isLoading) return <Loader />;
    return (
        <div className={s.monitor}>
            {
                currencies.map( function(currency,index) {
                    const {name, symbol, price, series } = currency;
                    return (
                        <div className={s.item}>
                            <h2>{name} <span>({symbol})</span></h2>
                            <strong>
                                <span className={s.price}>{simplePrice(price,1)}</span>
                                <span className={s.label}>Current Price</span>
                            </strong>
                            <div className={s.chart}>
                                <Sparklines data={series} margin={0.5} height={30}>
                                    <SparklinesLine style={{strokeWidth: 1, stroke: colorForIndex(index), fill: tintForIndex(index), fillOpacity: "0.1"}}/>
                                </Sparklines>
                            </div>
                         </div>)
                    }
                )
            }
        </div>
    );
};