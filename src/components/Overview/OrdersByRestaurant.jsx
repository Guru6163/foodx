import React, { useState, useEffect } from 'react'
import { Chart } from 'primereact/chart';
import { getTotalOrdersByRestaurant } from '../../apis/api';

function OrdersByRestaurant() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    getTotalOrdersByRestaurant().then((res) => {
      console.log(res)
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      // Transform the API response data into the format expected by the Chart component
      const data = {
        labels: res.map((item) => item.restaurantName), // Array of date strings
        datasets: [
          {
            label: 'Order Count',
            backgroundColor: [
              '#FF6384', // Example color 1
              '#36A2EB', // Example color 2
              '#FFCE56', // Example color 3
              // Add more colors as needed
            ],
            borderColor: [
              '#FF6384', // Example color 1
              '#36A2EB', // Example color 2
              '#FFCE56', // Example color 3
              // Add more colors as needed
            ],
            data: res.map((item) => item.orderCount), // Array of count values
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
        <div className='text-center font-bold my-3'>Total Orders By Restaurants</div>
        <Chart type="bar" className='p-2' data={chartData} options={chartOptions} />
      </div>
    </div>
  )
}

export default OrdersByRestaurant