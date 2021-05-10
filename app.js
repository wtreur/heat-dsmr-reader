const SmartMeter = require('node-dsmr')

const options = {
    port: '/dev/ttyUSB0',
    baudrate: 115200,
    databits: 8,
    parity: 'none',
    disableCrcChecking: true
}

const smartmeter = new SmartMeter(options)

smartmeter.on('connected', () => {
    console.log('connected!')
});

smartmeter.on('telegram', (data) => {
  console.log('telegram!', data.heat.totalConsumed)
});