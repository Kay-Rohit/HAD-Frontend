import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function ProgressChart({ data }) {
  return (
    <Line
      data={data}
      options={{
        plugins: { title: { display: true, text: "User's wek-wise progress" } },
        scales: {
          y: {
            max: 100,
            min: 0,
          },
        },
      }}
    />
  );
}

export default ProgressChart;
