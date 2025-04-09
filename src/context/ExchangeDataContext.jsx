import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';

const ExchangeDataContext = createContext(null);

const PER_PAGE = 100; // Fetch more exchanges initially for potential future features

export function ExchangeDataProvider({ children }) {
  const [allExchanges, setAllExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllExchanges = async () => {
      setLoading(true);
      setError(null);
      let fetchedExchanges = [];
      let currentPage = 1;
      let totalFetched = 0;
      const MAX_PAGES = 3; // Limit pages to avoid excessive calls

      // CoinGecko doesn't provide a total count easily for exchanges,
      // so we fetch a few pages or until fewer than PER_PAGE are returned.
      try {
        while (currentPage <= MAX_PAGES) {
          const response = await axios.get(`https://api.coingecko.com/api/v3/exchanges?per_page=${PER_PAGE}&page=${currentPage}`);
          fetchedExchanges = fetchedExchanges.concat(response.data);
          totalFetched = response.data.length;
          if (totalFetched < PER_PAGE) {
            break; // Stop if last page had fewer than max results
          }
          currentPage++;
        }
        setAllExchanges(fetchedExchanges);
      } catch (err) {
        setError('Failed to fetch exchange data');
        console.error("Exchange Data Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllExchanges();
  }, []); // Fetch only once on mount

  const value = useMemo(() => ({ 
    allExchanges, 
    loading, 
    error 
  }), [allExchanges, loading, error]);

  return (
    <ExchangeDataContext.Provider value={value}>
      {children}
    </ExchangeDataContext.Provider>
  );
}

// Custom hook to consume the context
export function useExchangeData() {
  const context = useContext(ExchangeDataContext);
  if (context === undefined) {
    throw new Error('useExchangeData must be used within an ExchangeDataProvider');
  }
  return context;
} 