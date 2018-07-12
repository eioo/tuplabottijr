// Database
interface IDatabase {
  chats: Array<IDBChat>;
}

interface IDBChat {
  chatId: number;
  weather: IDBWeatherCommand;
}

interface IDBWeatherCommand {
  cameras?: Array<string>;
  cities: Array<string>;
  enabled: boolean;
}

// API
interface IAPIList {
  [key: string]: any;
}

type ICommandList = IAPIList;

interface ISettings {
  weatherCommand?: {
    chatsEnabled: Array<number>;
  };

  cryptoCompare?: {
    watchedCurrencies: Array<string>;
  };
}

// OpenWeatherMap
interface ICity {
  id: number;
  weatherLines: Array<string>;
}

interface ICities {
  [key: string]: ICity;
}

// TrafficCamera
interface ITrafficCamera {
  url: string;
  timestamp?: number;
  cityName?: string;
}

// RSSReader
interface IStory {
  link: string;
  title: string;
  description: string;
}