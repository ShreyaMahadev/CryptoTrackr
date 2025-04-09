import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
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

function CryptoDetail({ currency }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cryptoData, setCryptoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('7');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [coinData, marketData] = await Promise.all([
          axios.get(`https://api.coingecko.com/api/v3/coins/${id}`),
          axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${timeRange}`)
        ]);
        
        setCryptoData({
          ...coinData.data,
          marketData: marketData.data
        });
      } catch (err) {
        setError('Failed to fetch cryptocurrency data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, currency, timeRange]);

  // --- Chart Configuration --- //
  const formatTooltipLabel = (context) => {
    let label = context.dataset.label || '';
    if (label) {
      label += ': ';
    }
    if (context.parsed.y !== null) {
      label += new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency.toUpperCase(),
        maximumFractionDigits: context.parsed.y > 10 ? 2 : 6 // Show more digits for smaller values
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
          unit: timeRange === '1' ? 'hour' : 'day' // Adjust time unit based on range
        },
        ticks: {
          color: '#9CA3AF', // text-gray-400
          maxRotation: 0,
          autoSkip: true,
          autoSkipPadding: 15
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // white/10
        }
      },
      y: {
        ticks: {
          color: '#9CA3AF', // text-gray-400
          callback: function(value) {
            return new Intl.NumberFormat('en-US', {
              notation: 'compact',
              maximumFractionDigits: 1
            }).format(value);
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // white/10
        }
      }
    },
    plugins: {
      legend: {
        display: false // Hide legend
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

  const priceChartData = {
    labels: cryptoData?.marketData?.prices?.map(price => price[0]) ?? [],
    datasets: [
      {
        fill: true,
        label: 'Price', 
        data: cryptoData?.marketData?.prices?.map(price => price[1]) ?? [],
        borderColor: cryptoData?.market_data?.price_change_percentage_24h >= 0 ? '#22C55E' : '#EF4444', // green-500 or red-500
        backgroundColor: context => { // Gradient fill
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          const colorStart = cryptoData?.market_data?.price_change_percentage_24h >= 0 ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)';
          gradient.addColorStop(0, colorStart);
          gradient.addColorStop(1, "rgba(0,0,0,0)");
          return gradient;
        },
        tension: 0.2,
        pointRadius: 0,
      },
    ],
  };

  // --- Helper Functions --- //
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
      maximumFractionDigits: price > 10 ? 2 : 6 // More precision for low values
    }).format(price);
  };

  const formatNumber = (number, compact = true) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
      notation: compact ? 'compact' : 'standard',
      maximumFractionDigits: compact ? 2 : 0 // No decimals for standard supply numbers
    }).format(number);
  };

  // --- Render Logic --- //
  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center py-16 text-red-400">{error}</div>;
  if (!cryptoData) return <div className="text-center py-16 text-gray-400">No data available for this coin.</div>;

  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="text-blue-400 hover:text-blue-300 mb-4 inline-flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to List
      </button>

      {/* Main Content Area */}
      <div className="bg-white/5 p-6 rounded-lg shadow-lg border border-white/10">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 border-b border-white/10 pb-6">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <img src={cryptoData.image.large} alt={cryptoData.name} className="w-12 h-12" />
            <div>
              <h1 className="text-3xl font-bold text-white">{cryptoData.name}</h1>
              <p className="text-gray-400 text-lg">{cryptoData.symbol.toUpperCase()}</p>
            </div>
          </div>
          <div className="text-left sm:text-right">
             <p className="text-3xl font-bold text-white">{formatPrice(cryptoData.market_data.current_price[currency])}</p>
             <p className={`text-lg font-medium ${cryptoData.market_data.price_change_percentage_24h_in_currency[currency] >= 0 ? 'text-green-400' : 'text-red-400'}`}>
               {cryptoData.market_data.price_change_percentage_24h_in_currency[currency]?.toFixed(2) ?? 'N/A'}%
               <span className="text-sm text-gray-400"> (24h)</span>
             </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8 text-center">
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Market Cap</p>
            <p className="text-lg font-semibold text-white">{formatNumber(cryptoData.market_data.market_cap[currency])}</p>
            <p className="text-xs text-gray-500">Rank #{cryptoData.market_cap_rank}</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">24h Volume</p>
            <p className="text-lg font-semibold text-white">{formatNumber(cryptoData.market_data.total_volume[currency])}</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Circulating Supply</p>
            <p className="text-lg font-semibold text-white">
              {formatNumber(cryptoData.market_data.circulating_supply, false)} {cryptoData.symbol.toUpperCase()}
            </p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Max Supply</p>
            <p className="text-lg font-semibold text-white">
              {cryptoData.market_data.max_supply 
                ? formatNumber(cryptoData.market_data.max_supply, false) + ' ' + cryptoData.symbol.toUpperCase()
                : '∞'}
            </p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="mb-8">
          <div className="flex justify-center space-x-2 sm:space-x-4 mb-4">
            <button 
              onClick={() => setTimeRange('1')}
              className={`px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm rounded ${timeRange === '1' ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
            >
              24h
            </button>
            <button 
              onClick={() => setTimeRange('7')}
              className={`px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm rounded ${timeRange === '7' ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
            >
              7d
            </button>
            <button 
              onClick={() => setTimeRange('30')}
              className={`px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm rounded ${timeRange === '30' ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
            >
              30d
            </button>
             <button 
              onClick={() => setTimeRange('90')}
              className={`px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm rounded ${timeRange === '90' ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
            >
              90d
            </button>
             <button 
              onClick={() => setTimeRange('365')}
              className={`px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm rounded ${timeRange === '365' ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
            >
              1y
            </button>
          </div>
          
          <div className="h-72 md:h-96">
            {cryptoData?.marketData?.prices ? (
               <Line options={chartOptions} data={priceChartData} />
            ) : (
               <p className="text-center text-gray-400">Price chart data not available.</p>
            )}
          </div>
        </div>

        {/* About Section */}
        {cryptoData.description?.en && (
          <div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-a:text-blue-400 hover:prose-a:text-blue-300">
            <h2 className="text-xl font-bold text-white mb-4">About {cryptoData.name}</h2>
            <div 
              dangerouslySetInnerHTML={{ __html: cryptoData.description.en }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CryptoDetail; 