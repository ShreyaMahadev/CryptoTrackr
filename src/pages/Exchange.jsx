import { useState, useEffect, useMemo } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { useExchangeData } from '../context/ExchangeDataContext';
import LoadingSpinner from '../components/LoadingSpinner';

const EXCHANGES_PER_PAGE = 25; // Display fewer per page for better UI

function Exchange() {
  const { allExchanges, loading, error } = useExchangeData(); // Use context hook
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'trust_score_rank', direction: 'ascending' });

  // Removed local state for exchanges, loading, error (comes from context)
  // Removed useEffect for fetching (done in context)

  const sortedExchanges = useMemo(() => {
    if (!allExchanges) return [];
    return [...allExchanges].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];
      
      if (aValue == null) aValue = sortConfig.direction === 'ascending' ? Infinity : -Infinity;
      if (bValue == null) bValue = sortConfig.direction === 'ascending' ? Infinity : -Infinity;

      if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });
  }, [allExchanges, sortConfig]);

  // Paginate the sorted data
  const paginatedExchanges = useMemo(() => {
    const startIndex = (currentPage - 1) * EXCHANGES_PER_PAGE;
    return sortedExchanges.slice(startIndex, startIndex + EXCHANGES_PER_PAGE);
  }, [sortedExchanges, currentPage]);

  const totalPages = useMemo(() => {
     return Math.ceil(sortedExchanges.length / EXCHANGES_PER_PAGE);
  }, [sortedExchanges]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1); // Reset to page 1 on sort
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown size={14} className="inline ml-1 text-gray-500" />;
    }
    return sortConfig.direction === 'ascending' ? '▲' : '▼';
  };

  if (loading) return <LoadingSpinner />; // Use spinner
  if (error) return <div className="text-center py-16 text-red-400">{error}</div>; // Adjusted padding
  if (!allExchanges) return null;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-white text-center mb-8">Top Cryptocurrency Exchanges</h1>

      {/* Constrain table width and center */}
      <div className="max-w-7xl mx-auto">
        <div className="overflow-x-auto bg-white/5 rounded-lg shadow-lg border border-white/10">
          {loading && <LoadingSpinner />}
          {error && <div className="text-center py-16 text-red-400">{error}</div>}
          {!loading && !error && (
            <table className="min-w-full">
              <thead className="border-b border-white/10">
                <tr>
                  <th 
                    className="py-3 px-4 text-left text-gray-400 font-medium text-sm cursor-pointer whitespace-nowrap"
                    onClick={() => requestSort('trust_score_rank')}
                  >
                    Rank {getSortIcon('trust_score_rank')}
                  </th>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium text-sm">Exchange</th>
                  <th 
                    className="py-3 px-4 text-left text-gray-400 font-medium text-sm cursor-pointer whitespace-nowrap"
                    onClick={() => requestSort('trade_volume_24h_btc_normalized')}
                  >
                    24h Volume (BTC) {getSortIcon('trade_volume_24h_btc_normalized')}
                  </th>
                  <th 
                    className="py-3 px-4 text-left text-gray-400 font-medium text-sm cursor-pointer whitespace-nowrap"
                    onClick={() => requestSort('year_established')}
                  >
                    Established {getSortIcon('year_established')}
                  </th>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium text-sm">Country</th>
                </tr>
              </thead>
              <tbody>
                {paginatedExchanges.map((exchange) => (
                  <tr 
                    key={exchange.id} 
                    className="border-b border-white/5 hover:bg-white/10 transition-colors duration-150"
                  >
                    <td className="py-4 px-4 text-gray-300 text-sm">{exchange.trust_score_rank}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <img src={exchange.image} alt={exchange.name} className="w-6 h-6 rounded-full" />
                        <a 
                          href={exchange.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-white hover:text-blue-400"
                        >
                          {exchange.name}
                        </a>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-white">
                      {exchange.trade_volume_24h_btc_normalized?.toFixed(2) ?? 'N/A'} BTC
                    </td>
                    <td className="py-4 px-4 text-gray-300">{exchange.year_established ?? 'N/A'}</td>
                    <td className="py-4 px-4 text-gray-300">{exchange.country ?? 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Improved Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-6">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white/10 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20"
          >
            Previous
          </button>
          <span className="py-2 text-gray-300">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-white/10 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Exchange; 