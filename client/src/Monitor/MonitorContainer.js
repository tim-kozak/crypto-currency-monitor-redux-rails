import React from "react"
import {connect} from "react-redux";
import {Monitor} from "./Monitor"
import {getMonitorGroupedChartData} from "../../stores/selectors";

const mapStateToProps = (state) => {
    const {currencies} = state;
    return {
        currencies: getMonitorGroupedChartData(state),
        isLoading: currencies.isLoading
    }
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Monitor);