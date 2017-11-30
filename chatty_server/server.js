
const express = require('express');
const SocketServer = require('ws').Server;
const newId = require('uuid/v1');
let online = 0;


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
const clients = [];

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  //keeps track of users logging on and updates page
  online ++;
  clients.push(ws);
  console.log('Client connected');
  console.log('Users Online', online);
  let onlineNotification = {
    onlineUsers: online,
    type: "usercountupdate"
  }
  clients.forEach((client) => {
    if (client.readyState == ws.OPEN) {
      client.send(JSON.stringify(onlineNotification));
    }
  });

  // Takes a message from a client, adds a unique id, and sends it to all clients
  ws.on('message', (message) => {
    message = JSON.parse(message);
    message.id = newId();
    clients.forEach((client) => {
      if (client.readyState == ws.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    //keep track of users logging off and updates page
    online--;
    console.log(online);
    let onlineNotification = {
      onlineUsers: online,
      type: "usercountupdate"
    }
    clients.forEach((client) => {
      if (client.readyState == ws.OPEN) {
        client.send(JSON.stringify(onlineNotification));
      }
    });
  });
});