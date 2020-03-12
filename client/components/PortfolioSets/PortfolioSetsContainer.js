import {connect} from "react-redux";
import {PortfolioSets} from "./PortfolioSets";
import {setActivePortfolio} from "../../store/dbl/portfolio/actions";

const mapStateToProps = (state) => {
    const {portfolio} = state;
    return {
        portfolio
    }
};
const mapDispatchToProps = {
    handleSetSelection: setActivePortfolio
};

export const PortfolioSetsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PortfolioSets);