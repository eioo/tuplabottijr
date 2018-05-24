
import * as schedule from 'node-schedule';
import config from '../../config';
import TuplabottiJr from '../Bot';
import OpenWeatherMap from '../lib/api/OpenWeatherMap';
import * as settings from '../lib/settings';
import CommandBase from './CommandBase';

export default class WeatherCommand extends CommandBase {
  chatsEnabled: Array<number>;
  api: OpenWeatherMap;

  constructor(base: TuplabottiJr) {
    super(base);
    this.api = this.base.weatherAPI;
    
    this.loadEnabledChats();
    this.eventHandler();
    this.scheduler();
  }

  eventHandler(): void {
    this.onText(/\/(sää|weather)/, (msg, args) => {
      if (args.length === 0) {
        this.sendWeatherData(msg.chat.id);
        return;
      }
      
      const arg = args[0].toLowerCase();

      if (args.length > 1 || !['enable', 'disable'].includes(arg)) {
        this.showHelp(msg.chat.id);
        return;
      }

      if (arg === 'enable') {
        if (!this.chatsEnabled.includes(msg.chat.id)) {
          this.chatsEnabled.push(msg.chat.id);
          this.saveEnabledChats();
        }

        this.sendMessage(msg.chat.id, 'Weather notifications enabled for this chat.');
      } else {
        const index = this.chatsEnabled.indexOf(msg.chat.id);
        if (index !== -1) {
          this.chatsEnabled.splice(index, 1);
          this.saveEnabledChats();
        }

        this.sendMessage(msg.chat.id, 'Weather notifications disabled for this chat.');
      }
    });
  }

  saveEnabledChats(): void {
    settings.write({
      weatherCommand: {
        chatsEnabled: this.chatsEnabled
      }
    });
  }

  loadEnabledChats(): void {
    const data = settings.read();
    
    if (data.weatherCommand) {
      this.chatsEnabled = data.weatherCommand.chatsEnabled;
      return;
    }

    this.chatsEnabled = [];
  }

  async sendWeatherData(chatId: number): Promise<void> {
    const message = await this.sendMessage(chatId, 'Loading weather data...');
    const response = await this.api.getWeatherReport();
    this.editMessage(message, response);
  }

  scheduler(): void {
    schedule.scheduleJob(config.weatherCron, () => {
      for (const chatId of this.chatsEnabled) {
        this.sendWeatherData(chatId);
      }
    });
  }
}