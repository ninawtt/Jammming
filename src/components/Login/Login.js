import React from 'react';
import './Login.css';

import Spotify from '../../util/Spotify';
class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {}
    }
    render() {
        return (
            <div className="Login">
                <button className="LoginBtn" onClick={Spotify.authentication}>LOGIN SPOTIFY</button>
            </div>
        );           
                
    }

}
export default Login;