import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Market from './pages/Market';
import Exchange from './pages/Exchange';
import Analytics from './pages/Analytics';
import Features from './pages/Features';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import CryptoDetail from './pages/CryptoDetail';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [currency, setCurrency] = useState('usd');

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar currency={currency} setCurrency={setCurrency} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home currency={currency} />} />
            <Route path="/features" element={<Features />} />
            <Route path="/market" element={<Market currency={currency} />} />
            <Route path="/exchange" element={<Exchange />} />
            <Route path="/analytics" element={<Analytics currency={currency} />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/crypto/:id" element={<CryptoDetail currency={currency} />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App; 