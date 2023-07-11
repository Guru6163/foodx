import React, { useState, useEffect } from 'react'
import { Chart } from 'primereact/chart';
import { getOrdersDataForBarChart } from '../../apis/api';

function OrderBarChart() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    getOrdersDataForBarChart().then((res) => {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      // Transform the API response data into the format expected by the Chart component
      const data = {
        labels: res.map((item) => item.date), // Array of date strings
        datasets: [
          {
            label: 'Order Count',
            backgroundColor: documentStyle.getPropertyValue('--blue-500'),
            borderColor: documentStyle.getPropertyValue('--blue-500'),
            data: res.map((item) => item.count), // Array of count values
          },
        ],
      };

      setChartData(data);

      const options = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          legend: {
            labels: {
              fontColor: textColor
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
              font: {
                weight: 500
              }
            },
            grid: {
              display: false,
              drawBorder: false
            }
          },
          y: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false
            }
          }
        }
      };
      setChartOptions(options);
    });
  }, []);



  return (
    <div>

      <div className="border-2 shadow-md">
        <div className='text-center font-bold my-3'>Orders Count</div>
        <Chart type="bar" className='p-2' data={chartData} options={chartOptions} />
      </div>
    </div>
  )
}

export default OrderBarChart