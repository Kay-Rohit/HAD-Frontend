import React from "react";
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS } from 'chart.js/auto'
import {barChartData} from '../fakeData'

function UsageTimeChart({data}) {
    return <Bar data={data}
    options={{plugins:{title:{display: true, text: 'Average App Usage Time'}}}}
    />
}

export default UsageTimeChart;