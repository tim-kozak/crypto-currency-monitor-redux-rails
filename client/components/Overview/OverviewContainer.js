import {connect} from "react-redux/es/alternate-renderers";
import React from 'react';
import {getHighchartsGrouppedAssetsData} from "../../store/dbl/selectors";
import {Overview} from "./Overview";

const mapStateToProps = (state) => {
    return {
        data: getHighchartsGrouppedAssetsData(state)
    }
};

export const OverviewContainer = connect(mapStateToProps)(Overview);