import React, {Component} from 'react';

class Message extends Component {
  render() {
    //depending on message type will render in different divs, controlling the styling
    if (this.props.value.type === 'MessageFromServer') {
      return (
        <div className="message">
          <span className="message-username" style={{color: this.props.value.color}}>{this.props.value.username}</span>
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

