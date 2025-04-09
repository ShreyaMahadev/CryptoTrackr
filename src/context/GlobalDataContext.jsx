import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';

const GlobalDataContext = createContext(null);

export function GlobalDataProvider({ children }) {
  const [globalData, setGlobalData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllGlobalData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [globalResponse, chartResponse] = await Promise.all([
          axios.get('https://api.coingecko.com/api/v3/global'),
          axios.get(`https://api.coingecko.com/api/v3/global/market_cap_chart?days=90`)
        ]);
        
        setGlobalData(globalResponse.data.data);
        setChartData(chartResponse.data);

      } catch (err) {
        let errorMessage = 'Failed to fetch global data';
        if (axios.isAxiosError(err) && err.response?.status === 429) {
          errorMessage = 'API rate limit exceeded. Please wait a moment.';
        } else {
          console.error("Global/Chart Data Fetch Error:", err);
        }
        setError(errorMessage);
        setGlobalData(null);
        setChartData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAllGlobalData();
  }, []);

  const value = useMemo(() => ({ 
    globalData, 
    chartData,
    loading, 
    error 
  }), [globalData, chartData, loading, error]);

  return (
    <GlobalDataContext.Provider value={value}>
      {children}
    </GlobalDataContext.Provider>
  );
}

export function useGlobalData() {
  const context = useContext(GlobalDataContext);
  if (context === undefined || context === null) {
    throw new Error('useGlobalData must be used within a GlobalDataProvider');
  }
  return context;
} 