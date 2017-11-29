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
  }

  //Adds to state and will update page on new message
  onNewPost(content) {
    console.log('from app', content);
    const newMessage = {
      username: this.state.currentUser.name,
      content: content
    };
    this.socket.send(JSON.stringify(newMessage));
    // const messages = this.state.messages.concat(newMessage)
    // this.setState({messages: messages})

  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.addEventListener('open', function (event) {
      console.log('Hello Server!');
    });
    this.socket.addEventListener('message', (msg) => {
      console.log('per parse json client', msg);
      msg = JSON.parse(msg.data);
      console.log('client side json parse', msg);
      this.setState({messages: this.state.messages.concat(msg)});
    });
  }

  render() {
    console.log("Rendering </App>");
    return (
      <div>
        <NavBar />
        <MessageList messages={ this.state.messages } />
        <ChatBar userName={ this.state.currentUser } onNewPost={ this.onNewPost } />
      </div>
    );
  }
}
export default App;
