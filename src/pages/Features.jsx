import {
  TrendingUp,
  CandlestickChart,
  BarChart,
  List,
  DollarSign,
  Info
} from 'lucide-react';

const featuresList = [
  {
    icon: TrendingUp,
    title: "Real-time Tracking",
    description: "View live price updates for hundreds of cryptocurrencies.",
    color: "text-blue-400"
  },
  {
    icon: List,
    title: "Top Coin Lists",
    description: "Browse top cryptocurrencies by market capitalization.",
    color: "text-green-400"
  },
  {
    icon: Info,
    title: "Detailed Coin View",
    description: "Dive deep into specific coins with detailed charts and market data.",
    color: "text-yellow-400"
  },
  {
    icon: DollarSign,
    title: "Multi-Currency Support",
    description: "View prices and market data in USD, EUR, or GBP.",
    color: "text-purple-400"
  },
  {
    icon: CandlestickChart,
    title: "Global Market Overview",
    description: "Get a snapshot of the total crypto market cap, volume, and dominance.",
    color: "text-red-400"
  },
  {
    icon: BarChart,
    title: "Market Analytics",
    description: "Visualize historical market trends with interactive charts.",
    color: "text-indigo-400"
  },
];

function Features() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-white text-center mb-8">CryptoTrackr Features</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuresList.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div 
              key={index}
              className="bg-white/5 p-6 rounded-lg shadow-lg border border-white/10 flex flex-col items-center text-center"
            >
              <Icon size={40} className={`${feature.color} mb-4`} />
              <h2 className="text-xl font-semibold text-white mb-2">{feature.title}</h2>
              <p className="text-gray-200 text-sm">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Features; 