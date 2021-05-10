const SmartMeter = require('./node-dsmr');
const MQTT = require("async-mqtt");
const config = require("./config")

const dsmrOptions = {
    port: config.dsmr.port,
    baudrate: 115200,
    databits: 8,
    parity: 'none',
    disableCrcChecking: config.dsmr.disableCrcChecking
};

let mqttClient;
let mqttClientConnected = false;

const smartmeter = new SmartMeter(dsmrOptions);

smartmeter.on('connected', async () => {
  mqttClient = await MQTT.connectAsync(config.mqtt.brokerUrl, {
    username: config.mqtt.username,
    password: config.mqtt.password
  });
  mqttClientConnected = true;
});

smartmeter.on('telegram', async (data) => {
  if (data.heat.totalConsumed) {
    if (mqttClientConnected) {
      try {    
        mqttClient.publish(config.mqtt.topic, data.heat.totalConsumed.toString());
      } catch (error) {
        console.error(error)
      }
    }
  }
});

smartmeter.connect();