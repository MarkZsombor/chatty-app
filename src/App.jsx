import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = null;
    this.state = {
      currentUser: {name: 'Mark'},
      messages : []
    };
    this.onNewPost = this.onNewPost.bind(this);
    this.onUserNameChange = this.onUserNameChange.bind(this);
  }

  //Adds to message list and will update page on new message
  onNewPost(content) {
    console.log('from app', content);
    let userName = this.state.currentUser.name;
    //If no current username, give a default value
    if (!userName) userName = 'anonymous';
    const newMessage = {
      username: userName,
      content: content
    };
    this.socket.send(JSON.stringify(newMessage));
  }

  //changes state of currentUser
  onUserNameChange(newName) {
    this.setState({currentUser: {name: newName }});
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    //Logs a message when client connects to server
    this.socket.addEventListener('open', function (event) {
      console.log('Hello Server!');
    });
    //takes message from server and renders it to the screen
    this.socket.addEventListener('message', (msg) => {
      msg = JSON.parse(msg.data);
      this.setState({messages: this.state.messages.concat(msg)});
    });
  }

  render() {
    console.log("Rendering </App>");
    return (
      <div>
        <NavBar />
        <MessageList messages={ this.state.messages } />
        <ChatBar userName={ this.state.currentUser }
          onNewPost={ this.onNewPost }
          onUserNameChange={ this.onUserNameChange } />
      </div>
    );
  }
}
export default App;
