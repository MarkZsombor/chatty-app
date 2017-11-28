import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Mark'},
      messages : [
      {
        id: 1,
        username: 'Mark',
        content: "how goes"
      },
      {
        id: 2,
        username: 'Bob',
        content: 'help i\'m stuck in the app'
      }
      ]
    };
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  render() {
    console.log("Rendering </App>");
    return (
      <div>
        <NavBar />
        <MessageList messages={ this.state.messages } />
        <ChatBar userName={ this.state.currentUser } />
      </div>
    );
  }
}
export default App;
