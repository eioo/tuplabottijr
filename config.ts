const config = {
  // Telegram bot token
  botToken: process.env.BOT_TOKEN || '',

  // OpenWeatherMap token
  openWeatherMap: {
    token: process.env.OPENWEATHERMAP_TOKEN,
    weatherLinesCount: 6,
    showDescriptions: false,
    cities: [
      {
        name: 'Lahti',
        camera:
          'https://www.kelikamerat.info/kelikamerat/P%C3%A4ij%C3%A4t-H%C3%A4me/Lahti/tie-4/vt4_Ahtiala/Lahteen-C0453602'
      },
      {
        name: 'Tampere',
        camera: `https://storage.roundshot.com/54d1f0994883b9.68199787/`
      }
    ]
  },

  // See https://github.com/node-schedule/node-schedule#cron-style-scheduling
  weatherCron: '0 7 * * *',

  // Bot won't process commands that are older than (seconds)
  commandTimeout: 10,

  // Supported fiat currencies
  fiatCurrencies: ['USD', 'EUR', 'GBP'],
  
  // Price update interval (seconds)
  priceUpdateInterval: 5,

  // If coinlist is older than this (seconds), it's fetched from API instead of cache
  coinlistLifespan: 300
};

export default config;