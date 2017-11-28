import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList/>");
    const messages = this.props.messages;
    console.log(messages);
    const messageList = messages.map((item) =>
      <Message key={item.id}
               value={item} />
    );
    console.log(messageList);
    return (
      <main className="messages">
        {messageList}
      </main>
    );
  }
}
export default MessageList;