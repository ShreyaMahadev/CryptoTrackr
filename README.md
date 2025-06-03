# CryptoTrackr

Your Gateway to Cryptocurrency Insights.

CryptoTrackr is a web application built with React, Vite, and Tailwind CSS that allows users to track cryptocurrency prices, view market data, and explore exchange information. It utilizes the CoinGecko API for real-time data.

## 🚀 Live Demo

Check out the live project here: [CryptoTrackrr](https://cryptotrackrr.netlify.app/)

## Features

*   **Real-time Tracking**: View live price updates for the top 100 cryptocurrencies.
*   **Search**: Quickly find specific cryptocurrencies by name or symbol.
*   **Detailed View**: Click on a coin to see detailed information, historical price charts (24h, 7d, 30d, 90d, 1y), market stats, and description.
*   **Multi-Currency**: Switch between USD, EUR, and GBP for price displays.
*   **Global Market Overview**: See the total market cap, 24h volume, and BTC dominance.
*   **Exchange List**: Browse top cryptocurrency exchanges with sorting and pagination.
*   **Market Analytics**: View a historical chart of the total cryptocurrency market cap.
*   **Responsive Design**: Adapts to different screen sizes.
*   **Dark Theme**: Uses a visually appealing dark purple gradient theme.

## Tech Stack

*   **Frontend**: React
*   **Build Tool**: Vite
*   **Styling**: Tailwind CSS
*   **Routing**: React Router
*   **API Calls**: Axios
*   **Charting**: Chart.js, react-chartjs-2, chartjs-adapter-date-fns
*   **Icons**: Lucide React
*   **Data Source**: [CoinGecko API](https://www.coingecko.com/en/api)

## Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (version 18.x or later recommended)
*   [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation

1.  Clone the repository (or download the code):
    ```bash
    git clone <repository-url>
    cd CryptoTrackr
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

1.  Start the Vite development server:
    ```bash
    npm run dev
    ```
2.  Open your browser and navigate to `http://localhost:3000` (or the port specified in the terminal).

## Project Structure

```
/ CryptoTrackr
|-- /public          # Static assets
|-- /src
|   |-- /components  # Reusable UI components (Navbar)
|   |-- /pages       # Page components (Home, Market, Exchange, etc.)
|   |-- App.jsx      # Main application component, routing setup
|   |-- index.css    # Global styles, Tailwind directives
|   |-- main.jsx     # Application entry point
|-- .eslintrc.js     # ESLint configuration
|-- .gitignore       # Git ignore file
|-- index.html       # Main HTML entry point
|-- package.json     # Project metadata and dependencies
|-- postcss.config.js# PostCSS configuration
|-- README.md        # This file
|-- tailwind.config.js # Tailwind CSS configuration
|-- vite.config.js   # Vite configuration
```

## API Usage

This project relies heavily on the free tier of the CoinGecko API. Please be mindful of their rate limits (typically 10-30 calls per minute per IP). Excessive refreshing or navigation may lead to temporary API request failures. 
