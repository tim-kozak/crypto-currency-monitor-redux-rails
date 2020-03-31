import {createSelector} from "reselect";

/**
 * Getters
 */

export const getPortfolio = (state) => {
    return state.portfolio;
};

export const getPortfolioWithId = (state,props) => {
    return state.portfolio.byIds[props.id];
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
            const assetPrice = currencies.byIds[asset.currency_id].price;
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
           if (_asset.currency_id === asset.currency_id) {
               innerAsset = _asset
           }
        });

        if (!innerAsset) {
            grouped.assets.push({
                currency_id: asset.currency_id,
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

export const getSelectedPortfolioSetValue = createSelector( [getCurrencies,getSelectedPortfolio], (currencies, portfolioItem) => {
    let portfolioPrice = 0;
    portfolioItem.assets.map((asset) => {
        const assetPrice = currencies.byIds[asset.currency_id].price;
        const value = asset.amount;
        portfolioPrice += assetPrice * value;
    });
    return portfolioPrice;
});

export const getPortfolioSetValue =  createSelector( [getCurrencies,getPortfolioWithId], (currencies, portfolioItem) => {
    let portfolioPrice = 0;
    portfolioItem.assets.map((asset) => {
        const assetPrice = currencies.byIds[asset.currency_id].price;
        const value = asset.amount;
        portfolioPrice += assetPrice * value;
    });
    return portfolioPrice;
});

/**
 * Charts Data
 */

export const getHighchartsHistoricalData = createSelector( [getCurrencies], (currencies) => {
    let historical = {};
    currencies.allIds.map(id => {
        const priceChanges = currencies.byIds[id].price_changes;
        historical[id] = priceChanges.map( change => ([change.day,change.price]));
    });
    return historical;
});

export const getLastPrices = createSelector( [getHighchartsHistoricalData], (historical) => {
    let lastPrices = {};
    for (let [currency, data] of Object.entries(historical)) {
        const point = data[data.length-1];
        lastPrices[currency] = {
            timestamp: point[0],
            price: point[1]
        }
    }
    return lastPrices;
});

export const getHighchartsGrouppedAssetsData = createSelector( [getSelectedPortfolio,getCurrencies], (selectedPortfolio, currencies) => {
    return selectedPortfolio.assets.map(asset => {
        const currency = currencies.byIds[asset.currency_id];
        const name = currency.name;
        const value = asset.amount * currency.price;
        return [name, value]
    });
});

export const getHighchartsPortfolioData = createSelector( [getCurrencies, getSelectedPortfolio, getHighchartsHistoricalData], (currencies, selectedPortfolio, historical) => {
    let longestHistory = 0;
    let longestHistorycurrency_id = 0;
    let series = selectedPortfolio.assets.map((asset,index) => {
        const currency_id = asset.currency_id;
        const currency = currencies.byIds[currency_id];
        const data = historical[currency_id];
        if ( data.length > longestHistory) {
            longestHistory = data.length;
            longestHistorycurrency_id = currency_id;
        }
        return {
            name: currency.name,
            data: data,
        }
    });

    let maxSeriesDay = [0,0];
    let minSeriesDay = [0,0];
    let valueSeriesData = [];
    for (let i = 0; i<longestHistory; i++) {
        let dayValue = 0;
        selectedPortfolio.assets.map((asset) => {
            const currency_id = asset.currency_id;
            const data = historical[currency_id];
            let backIndex = data.length - i - 1;

            if (backIndex >= 0) {
                const price = data[backIndex][1];
                dayValue += price * asset.amount;
            }
        });
        const largestBackIndex = longestHistory - 1 - i;
        const time = historical[longestHistorycurrency_id][largestBackIndex][0];
        const day = [time, dayValue];
        valueSeriesData.unshift(day);

        if (day[1] > maxSeriesDay[1]) maxSeriesDay = day;
        if (minSeriesDay[0] == 0 || day[1] < minSeriesDay[1]) minSeriesDay = day;
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
    return [yAxis, series,{ timestamp: maxSeriesDay[0], value: maxSeriesDay[1] },{ timestamp: minSeriesDay[0], value: minSeriesDay[1] } ];
});

export const getMonitorGroupedChartData = createSelector( [getCurrencies,getHighchartsHistoricalData], (currencies,historical) => {
    return currencies.allIds.map((id,index) => {
        const currency = currencies.byIds[id];
        const data = historical[id];
        const slise = 30;
        const seriesWTime = data.length > slise ? data.slice(-slise) : data;
        const seriesWOTime = seriesWTime.map(item=>(item[1]));
        return {
            id: id,
            name: currency.name,
            symbol: currency.symbol,
            price: currency.price,
            series: seriesWOTime
        }
    });
});