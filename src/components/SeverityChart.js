import React from "react";
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS } from 'chart.js/auto'

function UsageTimeChart({data}) {
    return <Pie data={data}
    options={{plugins:{title:{display: true, text: 'Severity Level of Users'}}}}
    />
}

export default UsageTimeChart;