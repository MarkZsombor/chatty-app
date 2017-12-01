
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

// Lets have some fun colors
var colors = [ 'red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange', 'pink', 'brown' ];
// ... in random order
colors.sort(function(a,b) { return Math.random() > 0.5; } );


// When a client connects they are assigned a socket, represented by the ws parameter in the callback.
wss.on('connection', (ws) => {
  //keeps track of users logging on and notifies app
  let userColor = null;
  online ++;
  clients.push(ws);
  console.log('Client connected');
  let onlineNotification = {
    onlineUsers: online,
    type: "usercountupdate",
    content: "A new user has connected",
    id: newId()
  }
  clients.forEach((client) => {
    if (client.readyState == ws.OPEN) {
      client.send(JSON.stringify(onlineNotification));
    }
  });

  //assigns a user a color if they don't already have one
  if(!userColor) {
    userColor = colors.shift();
    setColor = {
      type: "color",
      color: userColor
    };
  ws.send(JSON.stringify(setColor));
  }


  // Takes a message from a client, adds a unique id, and sends it to all clients
  ws.on('message', (message) => {
    message = JSON.parse(message);
    message.id = newId();
    //changes message type to distinguish messages from server
    if (message.type === 'PostMessage') message.type = 'MessageFromServer';
    clients.forEach((client) => {
      if (client.readyState == ws.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    //keep track of users logging off and notifies app
    online--;
    //decouples user from color and returns it to the pool
    if (userColor) colors.push(userColor);
    let onlineNotification = {
      onlineUsers: online,
      type: "usercountupdate",
      content: "A user has left the chatroom",
      id: newId()
    }
    clients.forEach((client) => {
      if (client.readyState == ws.OPEN) {
        client.send(JSON.stringify(onlineNotification));
      }
    });
  });
});