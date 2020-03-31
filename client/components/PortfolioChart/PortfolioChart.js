import s from './PortfolioChart.module.scss'

import React, { useState } from 'react';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import {simplePrice} from "../../utils/decorators";


export const PortfolioChart = (props) => {
    const {data,yAxis} = props;

    const options = {
        chart: {
            zoomType: 'x',
            backgroundColor: 'transparent',
            spacingTop: 0,
            spacingRight: 0,
            spacingBottom: 0,
            spacingLeft: 0,
            plotBorderWidth: 0,
            margin: [0,0,0,0],
            height: 450
        },
        rangeSelector: {
            buttons: [{
                type: 'week',
                count: 1,
                text: '1w'
            }, {
                type: 'month',
                count: 3,
                text: '3m'
            }, {
                type: 'month',
                count: 6,
                text: '1y'
            }, {
                type: 'all',
                count: 1,
                text: 'All'
            }],
            selected: 1,
            buttonPosition: {
                align: "right",
            },
            inputEnabled: false
        },
        title: {
            text: null
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: "USD Value"
            },
            labels: {
                enabled: false
            }
        },
        tooltip: {
            shared: true,
            split: false,
            pointFormatter: function (point) {
                return '<span style="color:' + this.color + '">●</span> ' + this.series.name + ': <b>' + simplePrice(this.y) + '</b><br/>';
            }
        },
        plotOptions: {
            area: {
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            },
            series: {
                compare: "percent"
            }
        },
        series: data,
        legend: {
            enabled: false
        }
    };
    const className = s.chart;
    return (
        <HighchartsReact
            containerProps={{ className:className }}
            highcharts={Highcharts}
            constructorType={'stockChart'}
            options={options}
            oneToOne={false}
        />
    );
};
