const fs = require('fs');
const log = require('./log');

class Configuration {
  constructor() {
    this.listen = {};
  }

  configure(configurationFileOrObject) {
    log.debug('before loaded: ', this.listen);
    if (typeof configurationFileOrObject === 'string') {
      this.loadConfigurationFile(configurationFileOrObject);
    } else {
      this.loadConfigurationObject(configurationFileOrObject);
    }
    log.debug('after loaded: ', this.listen);
  }

  loadConfigurationFile(configurationFile) {
    const configObj = JSON.parse(fs.readFileSync(configurationFile));
    this.loadConfigurationObject(configObj);
  }

  loadConfigurationObject(configurationObject) {
    this.listen = { ...this.listen, ...configurationObject };
  }

  get(keys) {
    if (typeof keys === 'string') {
      return this.listen[keys];
    }
    return keys.map(x => this.get(x));
  }
}

module.exports = Configuration;
