import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function ProgressChart({ data }) {
  return (
    <Line
      data={data}
      options={{
        plugins: { title: { display: true, text: "Week-wise severity score of user" } , legend: {
          display: false
      }, tooltips: {
        callbacks: {
           label: function(tooltipItem) {
                  return tooltipItem.yLabel;
           }
        }
    }},
        scales: {
          y: {
            max: 500,
            min: 0,
          },
        },
      }}
    />
  );
}

export default ProgressChart;
