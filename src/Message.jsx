import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log("Rendering <Message/>");
    return (
      <div className="message">
        <span className="message-username">Anonymous1</span>
        <span className="message-content">I won't be impressed with technology until I can download food.</span>
      </div>
    );
  }
}
export default Message;