import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <div className="online-users">{ this.props.onlineUsers } user(s) online now</div>
      </nav>
    );
  }
}
export default NavBar;

