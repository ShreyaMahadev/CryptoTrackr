import { DollarSign, TrendingUp, Bitcoin as BitcoinIcon } from 'lucide-react';
import { useGlobalData } from '../context/GlobalDataContext';
import LoadingSpinner from '../components/LoadingSpinner';

function Market({ currency }) {
  const { globalData, loading, error } = useGlobalData(); // Use context hook

  const formatCompact = (number) => {
    if (number == null) return 'N/A'; // Handle null data
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
      notation: 'compact',
      maximumFractionDigits: 2
    }).format(number);
  };

  if (loading) return <LoadingSpinner />; // Use spinner
  if (error) return <div className="text-center py-16 text-red-400">{error}</div>; // Adjusted padding
  if (!globalData) return null;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-white text-center mb-8">Global Cryptocurrency Market</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Market Cap */}
        <div className="bg-white/10 p-6 rounded-lg shadow-lg border border-white/10">
          <div className="flex items-center space-x-3 mb-2">
            <DollarSign size={20} className="text-blue-400" />
            <h2 className="text-lg font-semibold text-gray-300">Total Market Cap</h2>
          </div>
          <p className="text-3xl font-bold text-white">
            {formatCompact(globalData.total_market_cap[currency])}
          </p>
        </div>

        {/* 24h Volume */}
        <div className="bg-white/10 p-6 rounded-lg shadow-lg border border-white/10">
          <div className="flex items-center space-x-3 mb-2">
            <TrendingUp size={20} className="text-green-400" />
            <h2 className="text-lg font-semibold text-gray-300">24h Trading Volume</h2>
          </div>
          <p className="text-3xl font-bold text-white">
            {formatCompact(globalData.total_volume[currency])}
          </p>
        </div>

        {/* BTC Dominance */}
        <div className="bg-white/10 p-6 rounded-lg shadow-lg border border-white/10">
          <div className="flex items-center space-x-3 mb-2">
            <BitcoinIcon size={20} className="text-yellow-400" />
            <h2 className="text-lg font-semibold text-gray-300">BTC Dominance</h2>
          </div>
          <p className="text-3xl font-bold text-white">
            {globalData.market_cap_percentage?.btc?.toFixed(2) ?? 'N/A'}%
          </p>
        </div>

        {/* Active Cryptocurrencies */}
        <div className="bg-white/10 p-6 rounded-lg shadow-lg border border-white/10">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-xl">🪙</span>
            <h2 className="text-lg font-semibold text-gray-300">Active Coins</h2>
          </div>
          <p className="text-3xl font-bold text-white">
            {globalData.active_cryptocurrencies?.toLocaleString() ?? 'N/A'}
          </p>
        </div>
      </div>
      
      {/* Add more sections like Trending Coins if desired */}

    </div>
  );
}

export default Market; 