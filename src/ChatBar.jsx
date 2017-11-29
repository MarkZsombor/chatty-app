import React, {Component} from 'react';

class ChatBar extends Component {

  constructor() {
    super();

    this.state = {
      content: '',
      error: '',
      }

    this.handleKeyPress = this.handleKeyPress.bind(this);
  }



  handleKeyPress(event) {
    if(event.key == 'Enter') {
      const state = {
        error: ''
      };
      console.log('pushed the button');
      console.log('from key press', event.target.value);
      this.props.onNewPost(event.target.value);
      event.target.value = "";
      // state.content = "";
      // console.log('state', state);
      // this.setState(state);
    }
  };

  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={ this.props.userName.name } placeholder="Your Name (Optional)" />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={ this.handleKeyPress } />
      </footer>
    );
  }
}
export default ChatBar;