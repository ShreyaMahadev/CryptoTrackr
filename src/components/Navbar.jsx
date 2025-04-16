import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Menu, X, ChevronDown, DollarSign, Euro, PoundSterling } from 'lucide-react';

function Navbar({ currency, setCurrency }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
        {/* Left Side: Logo */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-blue-400" />
            <span className="text-xl font-bold text-white">CryptoTrackr</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Center: Navigation Links */}
        <div
          className={`${
            isMobileMenuOpen ? 'block' : 'hidden'
          } md:flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-gradient-to-br from-[#2A0D5C] to-[#4E1A8D] md:bg-transparent p-4 md:p-0 z-10`}
        >
          <ul className="space-y-2 md:space-y-0 md:flex md:space-x-6">
            <li>
              <Link to="/features" className="text-gray-300 hover:text-white">
                Features
              </Link>
            </li>
            <li>
              <Link to="/market" className="text-gray-300 hover:text-white">
                Market
              </Link>
            </li>
            <li>
              <Link to="/exchange" className="text-gray-300 hover:text-white">
                Exchange
              </Link>
            </li>
            <li>
              <Link to="/analytics" className="text-gray-300 hover:text-white">
                Analytics
              </Link>
            </li>
            <li>
              <Link to="/blog" className="text-gray-300 hover:text-white">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Side: Currency Selector */}
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
    </nav>
  );
}

export default Navbar;