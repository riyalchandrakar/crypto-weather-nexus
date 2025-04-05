import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { format } from 'date-fns'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function WeatherChart({ data }) {
  if (!data || !data.list) return <p>No weather history data available</p>

  const chartData = {
    labels: data.list.map(item => format(new Date(item.dt * 1000), 'MMM d HH:mm')),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: data.list.map(item => item.main.temp),
        borderColor: 'rgb(234, 88, 12)',
        backgroundColor: 'rgba(234, 88, 12, 0.5)',
        yAxisID: 'y'
      },
      {
        label: 'Humidity (%)',
        data: data.list.map(item => item.main.humidity),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        yAxisID: 'y1'
      }
    ]
  }

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      title: {
        display: true,
        text: 'Weather Forecast'
      }
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Temperature (°C)'
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Humidity (%)'
        },
        min: 0,
        max: 100,
        grid: {
          drawOnChartArea: false
        }
      }
    }
  }

  return <Line data={chartData} options={options} />
}