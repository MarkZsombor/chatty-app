import React, {Component} from 'react';

class ChatBar extends Component {

  constructor() {
    super();

    this.state = {
      content: '',
      error: '',
      }

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.changeUserNameEnter = this.changeUserNameEnter.bind(this);
    this.changeUserNameBlur = this.changeUserNameBlur.bind(this);
  }

  //Changes username when enter is pressed while focus is on name input
  changeUserNameEnter(event) {
    if(event.key == 'Enter') {
      const state = {
        error: ''
      };
      this.props.onUserNameChange(event.target.value);
      //changes the screen focus to the message input on enter
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


  handleKeyPress(event) {
    // Works for object database
    if(event.key == 'Enter') {
      const state = {
        error: ''
      };
      this.props.onNewPost(event.target.value);
      event.target.value = "";
    }
  };

  render() {
    console.log("Rendering <ChatBar/>");
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