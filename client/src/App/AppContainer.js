import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {App} from "./App"
import {fetchCurrenciesAndRatesThunk} from "../../stores/actions/actions";
import {Loader} from "../common/Loader";


const mapStateToProps = (state) => {
    const isLoading = state.currencies.isLoading;
    return {
        isLoading
    }
};
const mapDispatchToProps = {
    getCurrencies: fetchCurrenciesAndRatesThunk
};

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)((props) => {
    const {getCurrencies,isLoading} = props;
    useEffect(() => {
        getCurrencies();
    },[]);

    return <>{isLoading ? <Loader /> : <App />}</>;
});
