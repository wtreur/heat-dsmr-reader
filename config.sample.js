const config = {}

config.broker = {
  url: "tcp://localhost:1883",
  username: "user",
  password: "password",
  topic: "heat/usage"
}

config.dmsr = {
  port: '/dev/ttyUSB0',
  disableCrcChecking: true
}

module.exports = config;
