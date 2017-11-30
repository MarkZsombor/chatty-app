import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    console.log("Rendering <NavBar/>");
    console.log('props in navbar', this.props)
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <div className="online-users">{ this.props.onlineUsers } user(s) online now</div>
      </nav>
    );
  }
}
export default NavBar;

//    <div>{ this.props.onlineUsers } users online now</div>