import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList/>");
    const messages = this.props.messages;
    const messageList = messages.map((msg) =>
      <Message key={msg.id}
               value={msg} />
    );
    return (
      <main className="messages">
        {messageList}
      </main>
    );
  }
}
export default MessageList;