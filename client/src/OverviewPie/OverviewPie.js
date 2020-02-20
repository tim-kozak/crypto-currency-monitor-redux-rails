import React from 'react';
import s from './OverviewPie.module.scss'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import {simplePercentage, simplePrice} from "../utils/decorators";


export const OverviewPie = (props) => {
    const {data} = props;

    const options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: null,
        },
        tooltip: {
            enabled: true,
            formatter: function() {
                return "<b>"+this.key+"</b><br/><b>"+simplePercentage(this.percentage)+"</b> | Current value: <b>"+simplePrice(this.y,0)+"</b>";
            }
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -55,
                    style: {
                        fontWeight: 'bold',
                        color: 'white',
                        textOutline: "0px"
                    }
                },
                size: '100%',
                colors: ["#ffa600", "#ff6361","#58508d"]
            }
        },
        series: [{
            type: 'pie',
            name: 'Assets share',
            innerSize: '30%',
            data: data
        }]
    };

    const className = s.chart;
    return (
        <HighchartsReact
            containerProps={{ className:className }}
            highcharts={Highcharts}
            options={options}
        />
    );
};
