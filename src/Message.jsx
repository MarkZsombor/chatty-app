import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log("Rendering <Message/>");
    console.log(this.props);
    return (
      <div className="message">
        <span className="message-username">{this.props.value.username}</span>
        <span className="message-content">{this.props.value.content}</span>
      </div>
    );
  }
}
export default Message;

