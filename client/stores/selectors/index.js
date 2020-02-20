import {createSelector} from "reselect";

/**
 * Getters
 */

export const getPortfolio = (state) => {
    return state.portfolio;
};

export const getCurrencies = (state) => {
    return state.currencies;
};

export const getSelectedPortfolioId = (state) => {
    return state.appState.selectedPortfolioId;
};

export const getLastUpdatedDate = (state) => {
    return state.currencies.lastUpdated;
};

/**
 * Selectors
 */

export const getOverallNetWorth = createSelector( [getCurrencies,getPortfolio], (currencies, portfolio) => {
    let netWorth = 0;
    portfolio.allIds.map((id)=> {
        const currentPortfolio = portfolio.byIds[id];
        let portfolioPrice = 0;
        currentPortfolio.assets.map((asset) => {
            const assetPrice = currencies.byIds[asset.currencyId].price;
            const value = asset.amount;
            portfolioPrice += assetPrice * value;
        });
        netWorth += portfolioPrice;
    });

    return netWorth;
});

export const getAllAssets = createSelector( [getPortfolio], (portfolio) => {
    let assets = [];
    portfolio.allIds.map((id)=> {
        const currentPortfolio = portfolio.byIds[id];
        assets = [...assets,...currentPortfolio.assets];
    });
    return assets;
});

export const getGroupedAssetsPortfolio = createSelector( [getAllAssets], (allAssets) => {
    let grouped = {
        name: "All",
        assets: []
    };
    allAssets.map(asset => {
        let innerAsset = null;

        grouped.assets.map(function (_asset) {
           if (_asset.currencyId === asset.currencyId) {
               innerAsset = _asset
           }
        });

        if (!innerAsset) {
            grouped.assets.push({
                currencyId: asset.currencyId,
                amount: asset.amount
            })
        } else {
            innerAsset.amount += asset.amount;
        }
    });

    return grouped;
});

export const getSelectedPortfolio = createSelector( [getPortfolio,getSelectedPortfolioId, getGroupedAssetsPortfolio], (portfolio, id, all) => {
    if (!id) {
        return all;
    }
    return portfolio.byIds[id];
});

export const getSelectedPortfolioSetValue = createSelector( [getCurrencies,getPortfolio,getSelectedPortfolio], (currencies, portfolio, portfolioItem) => {
    let portfolioPrice = 0;
    portfolioItem.assets.map((asset) => {
        const assetPrice = currencies.byIds[asset.currencyId].price;
        const value = asset.amount;
        portfolioPrice += assetPrice * value;
    });
    return portfolioPrice;
});

/**
 * Charts Data
 */
export const getHighchartsGrouppedAssetsData = createSelector( [getSelectedPortfolio,getCurrencies], (selectedPortfolio, currencies) => {
    return selectedPortfolio.assets.map(asset => {
        const currency = currencies.byIds[asset.currencyId];
        const name = currency.name;
        const value = asset.amount * currency.price;
        return [name, value]
    });
});

export const getHighchartsPortfolioData = createSelector( [getCurrencies, getSelectedPortfolio], (currencies, selectedPortfolio) => {
    let longestHistory = 0;
    let longestHistoryCurrencyId = 0;
    let series = selectedPortfolio.assets.map((asset,index) => {
        const currencyId = asset.currencyId;
        const currency = currencies.byIds[currencyId];
        const historical = currency.historical;
        if ( historical.length > longestHistory) {
            longestHistory = historical.length;
            longestHistoryCurrencyId = currencyId;
        }
        return {
            name: currency.name,
            data: historical,
        }
    });

    let maxSeriesDay = [0,0];
    let valueSeriesData = [];
    for (let i = 0; i<longestHistory; i++) {
        let dayValue = 0;
        selectedPortfolio.assets.map((asset) => {
            const currencyId = asset.currencyId;
            const historical = currencies.byIds[currencyId].historical;
            let backIndex = historical.length - i - 1;

            if (backIndex >= 0) {
                const price = historical[backIndex][1];
                dayValue += price * asset.amount;
            }
        });
        const largestBackIndex = longestHistory - 1 - i;
        const time = currencies.byIds[longestHistoryCurrencyId].historical[largestBackIndex][0];
        const day = [time, dayValue];
        valueSeriesData.unshift(day);

        if (day[1] > maxSeriesDay[1]) maxSeriesDay = day;
    }

    const valueSeries = {
        name: "Portfolio Value",
        data: valueSeriesData,
        type: 'area'
    };
    series.unshift(valueSeries);

    const yAxis = series.map((item) => {
        const opposite = item.name !== valueSeries.name;
        return {
            title: {
                text: item.name
            },
            opposite: opposite
        }
    });
    return [yAxis, series,{ timestamp: maxSeriesDay[0], value: maxSeriesDay[1] } ];
});

export const getMonitorGroupedChartData = createSelector( [getCurrencies], (currencies) => {
    return currencies.allIds.map((id,index) => {
        const currency = currencies.byIds[id];
        const historical = currency.historical;
        const slise = 30;
        const seriesWTime = historical.length > slise ? historical.slice(-slise) : historical;
        const seriesWOTime = seriesWTime.map(item=>(item[1]));
        return {
            name: currency.name,
            symbol: currency.symbol,
            price: currency.price,
            series: seriesWOTime
        }
    });
});