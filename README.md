# CryptoWeather Nexus Dashboard

A simple dashboard that displays real-time cryptocurrency prices, weather updates, and the latest crypto news.

## Features

- Real-time crypto prices (BTC, ETH, SOL)
- Weather data for New York, London, and Tokyo
- Latest crypto news headlines
- Price change and weather alerts
- Add to favorites
- Responsive design

## Tech Stack

- **Frontend**: Next.js 13, React 18  
- **Styling**: Tailwind CSS  
- **State Management**: Redux Toolkit  
- **APIs**: CoinCap, OpenWeatherMap, NewsData.io  
- **Charts**: Chart.js  
- **Icons**: Heroicons

## Installation

```bash
git clone https://github.com/yourusername/crypto-weather-nexus.git
cd crypto-weather-nexus
npm install

##Configuration

 -Create a .env.local file in the root folder and add:
   NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_key_here
   NEXT_PUBLIC_NEWS_API_KEY=your_newsdataio_key_here

##Running the App

Development:
  npm run dev

Production:
  npm run build
  npm start


##Project Structure

  src/
├── components/
├── pages/
├── redux/
├── services/
├── styles/
└── utils/

##Troubleshooting

 -Make sure API keys are correct and .env.local exists

 -For WebSocket issues, check browser console

 -For build errors:

   rm -rf node_modules
   npm install
