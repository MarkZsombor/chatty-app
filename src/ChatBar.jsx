import React, {Component} from 'react';

class ChatBar extends Component {

  constructor() {
    super();

    this.state = {
      content: '',
      error: '',
      }

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.changeUserNameBlur = this.changeUserNameBlur.bind(this);
    this.changeUserNameEnter = this.changeUserNameEnter.bind(this);
  }

  //Changes to message input when enter is pressed on name input
  changeUserNameEnter(event) {
    if(event.key == 'Enter') {
      this.refs.message.focus();
    }
  };

  //Changes username when focus is lost from name input
  changeUserNameBlur(event) {
    const state = {
      error: ''
    };
    this.props.onUserNameChange(event.target.value);
  };

  //When enter is pressed sends new message to App
  handleKeyPress(event) {
    if(event.key == 'Enter') {
      const state = {
        error: ''
      };
      let newMessage = {
        type: 'PostMessage',
        content: event.target.value
      }
      // newMessage = JSON.stringify(newMessage);
      // console.log('new message', newMessage)
      this.props.onNewPost(newMessage);
      event.target.value = "";
    }
  };

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username"
          defaultValue={ this.props.userName.name }
          placeholder="Your Name (Optional)"
          onKeyPress={ this.changeUserNameEnter }
          onBlur={this.changeUserNameBlur} />
        <input className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={ this.handleKeyPress }
          ref="message" />
      </footer>
    );
  }
}
export default ChatBar;