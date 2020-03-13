import {connect} from "react-redux";
import {PortfolioSets} from "./PortfolioSets";
import {createPortfolioThunk} from "../../store/services/portfolio/actions";
import {setActivePortfolio} from "../../store/services/app/actions";
import {getPortfolioSetValue} from "../../store/services/selectors";

const mapStateToProps = (state) => {
    const {portfolio,appState} = state;
    const _getPortfolioSetValue = (id) => {
        return getPortfolioSetValue(state,{id})
    };
    return {
        selectedPortfolioId: appState.selectedPortfolioId,
        portfolio,
        getPortfolioSetValue: _getPortfolioSetValue
    }
};
const mapDispatchToProps = {
    handleSetSelection: setActivePortfolio,
    handleAddPortfolio: createPortfolioThunk
};

export const PortfolioSetsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PortfolioSets);