import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, DollarSign, Euro, PoundSterling, ShoppingCart, BarChart, CandlestickChart, List, ChevronDown, Newspaper } from 'lucide-react';

function Navbar({ currency, setCurrency }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currencies = [
    { id: 'usd', name: 'USD', icon: DollarSign },
    { id: 'eur', name: 'EUR', icon: Euro },
    { id: 'gbp', name: 'GBP', icon: PoundSterling },
  ];

  const selectedCurrencyInfo = currencies.find(c => c.id === currency);
  const SelectedIcon = selectedCurrencyInfo?.icon || DollarSign;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-transparent p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Side: Logo and Brand */}
        <div className="flex items-center space-x-4 flex-1">
          <Link to="/" className="flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-blue-400" />
            <span className="text-xl font-bold text-white">CryptoTrackr</span>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center justify-center space-x-6 flex-grow">
          <Link to="/features" className="text-gray-300 hover:text-white">
            <span>Features</span>
          </Link>
          <Link to="/market" className="text-gray-300 hover:text-white">
            <span>Market</span>
          </Link>
          <Link to="/exchange" className="text-gray-300 hover:text-white">
            <span>Exchange</span>
          </Link>
          <Link to="/analytics" className="text-gray-300 hover:text-white">
            <span>Analytics</span>
          </Link>
          <Link to="/blog" className="text-gray-300 hover:text-white">
            <span>Blog</span>
          </Link>
        </div>
        
        {/* Right Side: Currency Selector */}
        <div className="flex items-center space-x-4 justify-end flex-1">
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-1 bg-white/10 p-1.5 rounded hover:bg-white/20 transition-colors duration-150"
            >
              <SelectedIcon className="h-4 w-4 text-white" />
              <span className="text-white text-sm font-medium pr-1">{selectedCurrencyInfo?.name || 'USD'}</span>
              <ChevronDown size={16} className={`text-white transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-gray-700 rounded-md shadow-lg z-10 border border-white/10">
                <ul className="py-1">
                  {currencies.map((curr) => {
                    const Icon = curr.icon;
                    return (
                      <li key={curr.id}>
                        <button
                          onClick={() => handleCurrencyChange(curr.id)}
                          className={`w-full flex items-center px-3 py-2 text-sm text-left hover:bg-gray-600 ${currency === curr.id ? 'text-white font-semibold' : 'text-gray-300'}`}
                        >
                          <Icon className="h-4 w-4 mr-2" />
                          {curr.name}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 