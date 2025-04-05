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

export default function CryptoChart({ data }) {
  const chartData = {
    labels: data?.map(item => format(new Date(item.time), 'MMM d')),
    datasets: [
      {
        label: 'Price (USD)',
        data: data?.map(item => parseFloat(item.priceUsd).toFixed(2)),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.1
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: (context) => `$${context.parsed.y}`
        }
      }
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => `$${value}`
        }
      }
    }
  }

  return <Line data={chartData} options={options} />
}