import {connect} from "react-redux";
import {Profile} from "./Profile";
import {getAllAssets, getLastUpdated, getOverallNetWorth} from "../../store/services/selectors";
import {simplePrice} from "../../utils/decorators";

const mapStateToProps = (state) => {
    const {profile, portfolio, currencies} = state;
    const netWorth = simplePrice(getOverallNetWorth(state),0);
    const assetsCount = getAllAssets(state).length;
    const lastUpdated = getLastUpdated(state);
    return {
        profile,
        portfolio,
        lastUpdated,
        netWorth,
        assetsCount
    }
};


export const ProfileContainer = connect(mapStateToProps)(Profile);