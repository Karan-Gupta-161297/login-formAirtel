
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { validateuser } from '../../services/ApiContainer';
import './Login.css';


const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      redirect: false,
      formErrors: {
        email: "",
        password: ""
      }

    };
    this.loginClicked = this.loginClicked.bind(this);
  }

  loginClicked() {
    console.log('You have successfully logged in..');
    if (this.state.email && this.state.password) {
      let obj = {
        email: this.state.email,
        password: this.state.password
      }
      validateuser(obj)
        .then((result) => {
          let responseJSON = result;
          if (responseJSON.userdata) {
            sessionStorage.setItem('userdata', responseJSON);
            this.setState({ redirect: true });
          }
          else {
            console.log("error");
          }
        });
    }
  }


  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
            --SUBMITTING--
            Id: ${this.state.email}
            Password: ${this.state.password}
          `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {

    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {

    if (this.state.redirect) {
      return (<Redirect to={'/home'} />)
    }


    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Log In</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="login">
              <button type="submit" onClick={this.loginClicked}>Log In</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;