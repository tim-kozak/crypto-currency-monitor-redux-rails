import {connect} from "react-redux";
import {Profile} from "./Profile";
import {getAllAssets, getOverallNetWorth} from "../../store/dbl/selectors";
import {simplePrice} from "../../utils/decorators";

const mapStateToProps = (state) => {
    const {profile, portfolio, currencies} = state;
    const netWorth = simplePrice(getOverallNetWorth(state),0);
    const assetsCount = getAllAssets(state).length;
    return {
        profile,
        portfolio,
        lastUpdated: currencies.lastUpdated,
        netWorth,
        assetsCount
    }
};


export const ProfileContainer = connect(mapStateToProps)(Profile);