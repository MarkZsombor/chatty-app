import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = null;
    this.state = {
      currentUser: {name: ''},
      messages: [],
      onlineUsers: 1
    };
    this.onNewPost = this.onNewPost.bind(this);
    this.onUserNameChange = this.onUserNameChange.bind(this);
  }

  //Adds to message list and will update page on new message
  onNewPost(object) {
    console.log('from app', object);
    let userName = this.state.currentUser.name;
    //If no current username, give a default value
    if (!userName) userName = 'anonymous';
    const newMessage = {
      username: userName,
      content: object.content,
      type: object.type
    };
    console.log('in app new message', newMessage);
    this.socket.send(JSON.stringify(newMessage));
  }

  //changes state of currentUser
  onUserNameChange(newName) {
    let oldName = this.state.currentUser.name;
    if (oldName !== newName) {
      if (!oldName) oldName = 'anonymous';
      console.log('name changed');
      let newMessage = {
      content: `User ${oldName} changed their name to ${newName}`,
      type: 'nameChange'
      };
      console.log('new message', newMessage)
      this.socket.send(JSON.stringify(newMessage));
      this.setState({currentUser: {name: newName }});
    }
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");

    //Logs a message when client connects to server
    this.socket.addEventListener('open', function (event) {
      console.log('Hello Server!');
    });

    //takes message from server and updates the stat
    this.socket.addEventListener('message', (msg) => {
      msg = JSON.parse(msg.data);
      console.log('in app msg', msg);
      //take usercount updates and updates state, else posts msg
      if (msg.type === "usercountupdate") {
        this.setState({onlineUsers: msg.onlineUsers});
      } else {
        this.setState({messages: this.state.messages.concat(msg)});
      }
    });
  }


  render() {
    console.log("Rendering </App>");
    return (
      <div>
        <NavBar onlineUsers={ this.state.onlineUsers } />
        <MessageList messages={ this.state.messages } />
        <ChatBar userName={ this.state.currentUser }
          onNewPost={ this.onNewPost }
          onUserNameChange={ this.onUserNameChange } />
      </div>
    );
  }
}
export default App;
