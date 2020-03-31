import React, {useState} from 'react';
import s from './AssetsList.module.scss'
import {simpleDate, simplePrice, simpleValue} from "../../utils/decorators";
import {COLORS} from "../../utils/colors";

export const Asset = (props) => {
    const {asset, index, currencies, canEdit} = props;
    const {handleEditAsset} = props;

    const currency = currencies.byIds[asset.currency_id];
    const assetName = currency.name;
    const amount = simpleValue(asset ? asset.amount : 0, 3);
    const value = simplePrice(currency.price * amount, 1);


    const [state, setState] = useState({
        isEditing: false,
    });

    const handleEdit = () => {
        setState({
            isEditing: !state.isEditing
        })
    };

    const listView = (<li>
        <div className={s.first}>
            <span className={s.number}>{index + 1}.</span>
            <span className={s.currency} style={{backgroundColor: COLORS[index]}}>{assetName}:</span>
        </div>
        <div className={s.second}>
            <span className={s.amount} onClick={handleEdit}>{amount}</span>
        </div>
        <div className={s.third}>
            <span className={s.value}>{value}</span>
        </div>
    </li>);

    const editView = (<form>
        <input type="text" value={amount}/>
        <button type="cancel">Cancel</button>
        <button type="submit">Save</button>
    </form>);

    return state.isEditing ? editView : listView;
};