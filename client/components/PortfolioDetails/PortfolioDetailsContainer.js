import {connect} from "react-redux";
import {PortfolioDetails} from "./PortfolioDetails";
import {
    getHighchartsPortfolioData,
    getLastUpdatedDate,
    getSelectedPortfolio,
    getSelectedPortfolioSetValue
} from "../../store/services/selectors";
import {simplePrice} from "../../utils/decorators";

const mapStateToProps = (state) => {
    const portfolioItem = getSelectedPortfolio(state);
    const portfolioValue = simplePrice(getSelectedPortfolioSetValue(state),1);
    const lastUpdated = getLastUpdatedDate(state);
    const {currencies} = state;
    const [yAxis,data,maxDay] = getHighchartsPortfolioData(state);

    return {
        isLoading: currencies.isLoading,
        currencies,
        portfolioItem,
        portfolioValue,
        lastUpdated,
        yAxis,
        data,
        maxDay
    }
};

export const PortfolioDetailsContainer = connect(mapStateToProps)(PortfolioDetails);