import React, {useState} from 'react';
import s from './AssetsList.module.scss'
import {simpleDate, simplePrice, simpleValue} from "../../utils/decorators";
import {COLORS} from "../../utils/colors";

export const AssetsList = (props) => {
    const {assets, currencies, handleAddAsset} = props;
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
                                    <span style={{ backgroundColor: COLORS[index]}}>{assetName}:</span>
                                </div>
                                {state.isEditing ? (<input type="text" value={amount}/>) : (<span className={s.amount} onClick={handleEdit}>{amount}</span>)}
                                <strong className={s.value}>{value}</strong>
                            </li>);
                })}
            </ul>
            <a className={s.add} onClick={()=> { handleAddAsset() }}>+ Add Asset</a>
        </div>
    );
};