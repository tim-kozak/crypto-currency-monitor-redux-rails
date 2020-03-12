import {connect} from "react-redux";
import {PortfolioSets} from "./PortfolioSets";
import {createPortfolioThunk} from "../../store/services/portfolio/actions";
import {setActivePortfolio} from "../../store/services/app/actions";

const mapStateToProps = (state) => {
    const {portfolio,appState} = state;
    return {
        selectedPortfolioId: appState.selectedPortfolioId,
        portfolio
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