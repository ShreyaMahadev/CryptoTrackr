function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 py-6 border-t border-white/10">
      <div className="container mx-auto text-center">
        <p className="text-sm text-gray-400">
          &copy; {currentYear} CryptoTrackr. All rights reserved.
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Data provided by <a href="https://www.coingecko.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">CoinGecko</a>.
        </p>
      </div>
    </footer>
  );
}

export default Footer; 