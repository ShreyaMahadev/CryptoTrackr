import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

function Home({ currency }) {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1`
        );
        setCryptoData(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch cryptocurrency data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currency]);

  const filteredResults = useMemo(() => {
    if (!cryptoData) return [];
    return cryptoData.filter(crypto => 
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cryptoData, searchTerm]);

  const dataToDisplay = searchTerm ? filteredResults : cryptoData.slice(0, 10);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h2 className="text-xl text-center font-bold text-gray-300 mb-6">Your Gateway to Cryptocurrency Insights.</h2>

      <div className="max-w-xl mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search cryptocurrencies (Top 100)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
          />
          <svg
            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      
      {/* Constrain table width and center */}
      <div className="max-w-full mx-auto">
        <div className="overflow-x-auto bg-white/5 rounded-lg shadow-lg border border-white/10">
          {loading && <LoadingSpinner />}
          {error && <div className="text-center py-16 text-red-400">{error}</div>}
          {!loading && !error && (
            <table className="min-w-full">
              <thead className="border-b border-white/10">
                <tr>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium text-sm">#</th>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium text-sm">Coin</th>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium text-sm">Price</th>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium text-sm">24h Change</th>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium text-sm">Market Cap</th>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium text-sm">24h Volume</th>
                </tr>
              </thead>
              <tbody>
                {dataToDisplay.map((crypto) => (
                  <tr 
                    key={crypto.id} 
                    className="border-b border-white/5 hover:bg-white/10 cursor-pointer transition-colors duration-150"
                    onClick={() => navigate(`/crypto/${crypto.id}`)}
                  >
                    <td className="py-4 px-4 text-gray-300 text-sm">{cryptoData.findIndex(c => c.id === crypto.id) + 1}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <img src={crypto.image} alt={crypto.name} className="w-6 h-6" />
                        <div>
                          <div className="font-medium text-white">{crypto.name}</div>
                          <div className="text-gray-400 text-xs">{crypto.symbol.toUpperCase()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-white">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: currency.toUpperCase()
                      }).format(crypto.current_price)}
                    </td>
                    <td className={`py-4 px-4 font-medium ${crypto.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {crypto.price_change_percentage_24h?.toFixed(2) ?? 'N/A'}%
                    </td>
                    <td className="py-4 px-4 text-gray-300">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: currency.toUpperCase(),
                        notation: 'compact'
                      }).format(crypto.market_cap)}
                    </td>
                    <td className="py-4 px-4 text-gray-300">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: currency.toUpperCase(),
                        notation: 'compact'
                      }).format(crypto.total_volume)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!loading && !error && dataToDisplay.length === 0 && (
            <div className="text-center py-8 text-gray-400">No cryptocurrencies match your search.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home; 