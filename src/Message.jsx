import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log("Rendering <Message/>");
    console.log('in msg the message', this.props.value);
    if (this.props.value.type === 'standardMsg') {
      return (
        <div className="message">
          <span className="message-username">{this.props.value.username}</span>
          <span className="message-content">{this.props.value.content}</span>
        </div>
      );
    } else {
      return (
        <div className="message system">
          {this.props.value.content}
        </div>
      );
    }
  }
}
export default Message;

