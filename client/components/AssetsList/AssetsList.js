import React, {useState} from 'react';
import s from './AssetsList.module.scss'
import {simpleDate, simplePrice, simpleValue} from "../../utils/decorators";
import {COLORS} from "../../utils/colors";
import {AddAsset} from "../AddAsset/AddAsset";

export const AssetsList = (props) => {
    const {assets, currencies, canEdit} = props;
    const {handleAddAsset} = props;
    const [state, setState] = useState({
        isEditing: false,
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
                                <div className={s.first}>
                                    <span className={s.number}>{index+1}.</span>
                                    <span className={s.currency} style={{ backgroundColor: COLORS[index]}}>{assetName}:</span>
                                </div>
                                <div className={s.second}>
                                    {state.isEditing ? (<input type="text" value={amount}/>) : (<span className={s.amount} onClick={handleEdit}>{amount}</span>)}
                                </div>
                                <div className={s.third}>
                                    <span className={s.value}>{value}</span>
                                </div>
                            </li>);
                })}
            </ul>
            { canEdit ? <AddAsset handleAddAsset={handleAddAsset} currencies={currencies}/> : null }
        </div>
    );
};