import React, {useState} from 'react';
import s from './AssetsList.module.scss'
import {simpleDate, simplePrice, simpleValue} from "../../utils/decorators";
import {COLORS} from "../../utils/colors";
import {AddAsset} from "../AddAsset/AddAsset";
import {Asset} from "./Asset";

export const AssetsList = (props) => {
    const {assets, currencies, canEdit} = props;
    const {handleAddAsset,handleEditAsset} = props;

    return (
        <div className={s.list}>
            <ul className={s.assets}>
                {assets.map(function(asset,index) {
                    return <Asset handleEditAsset={handleEditAsset} canEdit={canEdit} currencies={currencies} asset={asset} index={index}/>;
                })}
            </ul>
            { canEdit ? <AddAsset handleAddAsset={handleAddAsset} currencies={currencies}/> : null }
        </div>
    );
};