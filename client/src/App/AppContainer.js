import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {App} from "./App"
import {loginAndQueryAllDataThunk} from "../../stores/actions/actions";
import {Loader} from "../common/Loader";


const mapStateToProps = (state) => {
    const isLoading = state.currencies.isLoading;
    return {
        isLoading
    }
};
const mapDispatchToProps = {
    getTestData: loginAndQueryAllDataThunk
};

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)((props) => {
    const {getTestData,isLoading} = props;
    useEffect(() => {
        getTestData();
    },[]);

    return <>{isLoading ? <Loader /> : <App />}</>;
});
