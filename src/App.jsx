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
    this.onNewPost = this.onNewPost.bind(this);
  }

  //Adds to state and will update page on new message
  onNewPost(content) {
    console.log('from app', content);
    console.log('number of messages hopefully', this.state.messages.length);
    // const newId = this.state.messages.length + 1;
    // console.log('newid', newId);
    // const currentUser = this.state.currentUser.name;
    // console.log('currentname', currentUser);
    const newMessage = {
      id: this.state.messages.length + 1,
      username: this.state.currentUser.name,
      content: content
    };
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})
  }


  // componentDidMount() {
  //   console.log("componentDidMount <App />");
  //   setTimeout(() => {
  //     console.log("Simulating incoming message");
  //     // Add a new message to the list of messages in the data store
  //     const newMessage = {id: 3, username: "xXxHellspawn14xXx", content: "Anyone know where I can buy some fresh goats blood?"};
  //     const messages = this.state.messages.concat(newMessage)
  //     this.setState({messages: messages})
  //   }, 3000);
  // }

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
