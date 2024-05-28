import { CChart } from '@coreui/react-chartjs';
import * as React from 'react';

export default function AnalyticsBars() {
  return (
    <CChart
  type="bar"
  data={{
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'GitHub Commits',
        backgroundColor: '#f87979',
        data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
      },
    ],
  }}

  options={{
    plugins: {
      legend: {
        labels: {
          color: "black",
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: "yellow",
        },
        ticks: {
          color: "orange",
        },
      },
      y: {
        grid: {
          color: "yellow",
        },
        ticks: {
          color: "orange",
        },
      },
    },
  }}
/>
  );
}
