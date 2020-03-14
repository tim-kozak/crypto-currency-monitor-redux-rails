import React,{ useState } from "react";
import s from "./AddAsset.module.scss";

export const AddAsset = (props) => {
    const {handleAddAsset,currencies} = props;

    const [state, setState] = useState({
        isAdding: false,
        value: 0
    });

    const handleAdd = () => {
        setState({
            ...state,
            isAdding: !state.isAdding
        })
    };

    const handleInputChange = (e) => {
        setState({
            ...state,
            value: e.target.value
        })
    };

    const  handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const value = data.get("amount");
        const currencyId = data.get("currency_id");
        handleAddAsset(value,currencyId);
        setState({
            ...state,
            value: 0,
            isAdding: false
        });
    };

    const handleCancel = (e) => {
        e.preventDefault();
        setState({
            ...state,
            isAdding: false
        });
    };

    return ( state.isAdding ? (
            <form onSubmit={handleSubmit}>
                <select name="currency_id">
                    { currencies.allIds.map((id)=>(<option value={id}>{currencies.byIds[id].name}</option>)) }
                </select>
                <input name="amount" type="text" value={state.value} onChange={handleInputChange}/>
                <button type="cancel" onClick={handleCancel}>Cancel</button>
                <button type="submit">Save</button>
            </form>
        ) : (
            <a className={s.add} onClick={handleAdd}>+ Add Asset</a>
        ));
};