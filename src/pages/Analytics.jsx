import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import LoadingSpinner from '../components/LoadingSpinner';
import { useGlobalData } from '../context/GlobalDataContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler
);

function Analytics({ currency }) {
  const { chartData, loading, error } = useGlobalData();

  const formatTooltipLabel = (context) => {
    let label = context.dataset.label || '';
    if (label) {
      label += ': ';
    }
    if (context.parsed.y !== null) {
      label += new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact'
      }).format(context.parsed.y);
    }
    return label;
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day'
        },
        ticks: {
          color: '#9CA3AF',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        }
      },
      y: {
        ticks: {
          color: '#9CA3AF',
          callback: function(value) {
            return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(value);
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#D1D5DB'
        }
      },
      tooltip: {
        callbacks: {
          label: formatTooltipLabel
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  const marketCapChartData = {
    labels: chartData?.market_caps?.map(d => d[0]) ?? [],
    datasets: [
      {
        fill: true,
        label: `Total Market Cap (USD)`,
        data: chartData?.market_caps?.map(d => d[1]) ?? [],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.1,
        pointRadius: 0,
      },
    ],
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center py-16 text-red-400">Error: {error}</div>;
  if (!chartData?.market_caps) return <div className="text-center py-16 text-gray-400">Market Cap data not available.</div>;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-white text-center mb-8">Market Analytics</h1>

      <div className="bg-white/5 p-6 rounded-lg shadow-lg border border-white/10 h-96">
        <h2 className="text-xl font-semibold text-white mb-4">Total Market Cap (90 Days)</h2>
        <Line options={chartOptions} data={marketCapChartData} />
      </div>

    </div>
  );
}

export default Analytics; 