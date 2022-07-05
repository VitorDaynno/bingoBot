const dotenv = require('dotenv');

const logger = require('./logger');

class Settings {
  constructor() {
    dotenv.config();

   this.mongoUrl = this.getEnviroment('MONGO_URL');
  }

  getEnviroment(name) {
    try {
      const value = process.env[name];

      if (!value) {
        throw Error(`An enviroment variable ${name} not foud`);
      }

      return value;
    } catch (error) {
      logger.error(`An error occurred: ${error}`);
      process.exit();
    }
  }
}

module.exports = Settings;