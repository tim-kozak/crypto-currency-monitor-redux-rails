import React from "react"
import {connect} from "react-redux";
import {Monitor} from "./Monitor"
import {getLastPrices, getMonitorGroupedChartData} from "../../store/services/selectors";

const mapStateToProps = (state) => {
    const {currencies} = state;
    return {
        currencies: getMonitorGroupedChartData(state),
        isLoading: currencies.isLoading,
        prices: getLastPrices(state)
    }
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Monitor);