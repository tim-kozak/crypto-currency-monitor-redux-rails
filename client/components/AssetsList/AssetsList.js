import React, {useState} from 'react';
import s from './AssetsList.module.scss'
import {simpleDate, simplePrice, simpleValue} from "../../utils/decorators";
import {COLORS} from "../../utils/colors";

export const AssetsList = (props) => {
    const {assets, currencies, handleAddAsset} = props;
    const [state, setState] = useState({
        isEditing: false,
        isAdding: false
    });

    const handleEdit = () => {
        setState({
            isEditing: !state.isEditing
        })
    };

    const handleAdd = () => {
        setState({
            isAdding: !state.isAdding
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
            { state.isAdding ? (
                <form>
                    <select name="" id="">
                        <option value='1' />
                    </select>
                    <input />
                    <button type="cancel">Cancel</button>
                    <button type="submit">Save</button>
                </form>
            ) : (
                <a className={s.add} onClick={handleAdd}>+ Add Asset</a>
            )}
        </div>
    );
};