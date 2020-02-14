import React, { Component } from "react";
import LoginForm from "../Components/Login/LoginForm";

class LoginRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { }
    }
  };

  // handleLoginSuccess = () => {
  //   const { location, history } = this.props;
  //   const destination = (location.state || {}).from || "/";
  //   history.push(destination);
  // };

  render() {
    return (
      <section>
        <h2 className="login-page-link login-page-login-h2">Login</h2>
        <LoginForm />
        {/* <LoginForm onLoginSuccess={this.handleLoginSuccess} /> */}
      </section>
    );
  }
}

export default LoginRoute;
