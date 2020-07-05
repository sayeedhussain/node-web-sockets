// client.js
 
const WebSocket = require('ws')
const url = 'ws://localhost:8080'
const connection = new WebSocket(url)
 
connection.onopen = () => {
  console.log('Connection success') 
}
 
connection.onerror = (error) => {
  console.log('Connection failed: ', error)
}

connection.onclose = () => {
  console.log('Connected closed') 
}
 
connection.onmessage = (e) => {
  console.log('Received message from server: ',  e.data)
}