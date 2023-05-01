import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function PatientUsageChart({ data }) {
  return (
    <Line
      data={data}
      options={{ maintainAspectRatio: false,
        plugins: { title: { display: true, text: "App usage in minutes" }, legend: {
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
            max: 60,
            min: 0,
          },
        },
      }}
    />
  );
}

export default PatientUsageChart;
