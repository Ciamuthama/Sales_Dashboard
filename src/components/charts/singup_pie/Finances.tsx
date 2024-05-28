import { CChart } from '@coreui/react-chartjs';
import * as React from 'react';

export default function FinancesPie() {
  return (
    <CChart
    type="doughnut"
    data={{
      labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
      datasets: [
        {
          backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
          data: [40, 20, 80, 10],
        },
      ],
    }}
    options={{
      plugins: {
        legend: {
          labels: {
            color: "rgba(253,255,0)",
          }
        }
      },
    }}
  />
  );
}
