import React from 'react';
import s from './OverviewPie.module.scss'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import {simplePercentage, simplePrice} from "../../utils/decorators";
import {COLORS} from "../../utils/colors";


export const OverviewPie = (props) => {
    const {data} = props;

    const options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false,
            height: 300
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
                    distance: -45,
                    style: {
                        fontWeight: 'bold',
                        color: 'white',
                        textOutline: "0px"
                    },
                    overflow: 'justify',
                    crop: false,
                    formatter: function () {
                        return this.y > 5 ? this.point.name : null;
                    }
                },
                size: '100%',
                colors: COLORS
            }
        },
        series: [{
            type: 'pie',
            name: 'Assets share',
            innerSize: '35%',
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
