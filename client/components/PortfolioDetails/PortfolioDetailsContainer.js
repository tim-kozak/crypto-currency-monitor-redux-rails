import {connect} from "react-redux";
import {PortfolioDetails} from "./PortfolioDetails";
import {
    getHighchartsGrouppedAssetsData,
    getHighchartsPortfolioData,
    getLastUpdatedDate,
    getSelectedPortfolio,
    getSelectedPortfolioSetValue
} from "../../store/services/selectors";
import {simplePrice} from "../../utils/decorators";
import {createAssetThunk, deletePortfolioThunk, updatePortfolioNameThunk} from "../../store/services/portfolio/actions";

const mapStateToProps = (state) => {
    const portfolioItem = getSelectedPortfolio(state);
    const portfolioValue = simplePrice(getSelectedPortfolioSetValue(state),1);
    const lastUpdated = getLastUpdatedDate(state);
    const {currencies} = state;
    const [yAxis,data,maxDay] = getHighchartsPortfolioData(state);

    return {
        currencies,
        portfolioItem,
        portfolioValue,
        lastUpdated,
        pieData: getHighchartsGrouppedAssetsData(state),
        yAxis,
        data,
        maxDay,
    }
};

const mapDispatchToProps = {
    handleUpdatePortfolioName: updatePortfolioNameThunk,
    handleDeletePortfolio: deletePortfolioThunk,
    handleAddAsset: createAssetThunk
};
export const PortfolioDetailsContainer = connect(mapStateToProps,mapDispatchToProps)(PortfolioDetails);