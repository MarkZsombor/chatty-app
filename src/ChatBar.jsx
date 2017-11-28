import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    console.log("Rendering <ChatBar/>");
    console.log('username', this.props.userName);
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={ this.props.userName.name } placeholder="Your Name (Optional)" />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default ChatBar;