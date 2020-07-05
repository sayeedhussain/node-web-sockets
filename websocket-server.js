// server.js
 
const WebSocket = require('ws') 
const wss = new WebSocket.Server({ port: 8080 })
const clients = new Map();

setInterval(function() {  
  for (var connectionId in clients) {
    websocket = clients[connectionId];
    websocket.send(getData());
  }
}, (1 * 2 * 1000));  

const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};

wss.on('connection', websocket => {
  var connectionId = getUniqueID();
  clients[connectionId] = websocket
  websocket.on('close', () => {
    console.log("Connection closed: ", connectionId);
    delete clients[connectionId];
  });
})

function getData() {
  var date = new Date();
  var data = 
    {
      "TimeStamp": date.toISOString(),
      "Value": getCurrentValue(),
      "Message": "mA",
      "PinId": getPinId(),
      "NSamples": 0,
      "ChargeValue": getChargeValue(),
      "ConcreteStatus": "High",
      "Voltage": getVoltageValue()
  }
  return JSON.stringify(data);
}

function getPinId() {
  return getRandomInt(0, 5);
}

function getCurrentValue() {
  var currentValue = getRandomInt(32000, 33000);
  var decimalValue = getRandomInt(1, 99) / 100;
  return currentValue + decimalValue
}

function getVoltageValue() {
  var currentValue = getRandomInt(32000, 33000);
  var decimalValue = getRandomInt(1, 99) / 100;
  return currentValue + decimalValue
}

function getChargeValue() {
  return getRandomInt(19600000, 19610000);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}