import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../Store/actions/authActions";
import classnames from "classnames";


import './css/style.css';
import './css/style.css.map';
import './fonts/material-icon/css/material-design-iconic-font.css';
import './fonts/material-icon/css/material-design-iconic-font.min.css';
import './fonts/material-icon/fonts/Material-Design-Iconic-Font.eot';
import './fonts/material-icon/fonts/Material-Design-Iconic-Font.svg';
import './fonts/material-icon/fonts/Material-Design-Iconic-Font.ttf';
import './fonts/material-icon/fonts/Material-Design-Iconic-Font.woff';
import './fonts/material-icon/fonts/Material-Design-Iconic-Font.woff2';
import store from '../../Store/store';




//this component is the login page
//once the user is registered he/she can login 
class Login extends Component {
    constructor() {
        super();
//required fields to login 
        this.state = {
            email: "",
            password: "",
            errors: {}  
        }        
    }

// once the login is invoked this component is inserted into DOM tree and the same is done in store
    componentDidMount() {
        // Authenticating the credentials
        if (this.props.auth.isAuthenticated) {
            console.log(this.props);
            // window.location.href = '/';
        }
      }
      // to reset the state in the store whenever the prop changes and navigate to dashboard
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            console.log(this.props);
            window.location.href = '/';
        //    push user to dashboard when they login
        }
        //handling the errors 
    if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }

      //Onchange handler to set the values input by the user
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };

      //on Submit is the handler when user tries to  click on login button 
      //it stores the state of the login user
    onSubmit= e =>{
        e.preventDefault();
        // console.log("User Logged in",this.state.loginuser);
        const userData = {
            email : this.state.email, 
            password :this.state.password,   
         }
         this.props.loginUser(userData);
        }
// DOM tree to be rendered 
    render() {
    const { errors } = this.state;
      return (
        //here root element of the tree is section 
        <section className="sign-in">

            <div className="container">

            <div className="container2">

                <div className="signin-content">
                    <div className="signin-image">
                        <img src="https://www.flaticon.com/svg/static/icons/svg/295/295128.svg" alt="singin"></img>

                    </div>
                    {/* this div contains the Login form  */}
                    <div className="signin-form">
                        <h2 className="form-title">Login</h2>
                        {/* HandleSubmit is invoked from form tag */}
                        <form className="register-form" id="login-form" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label for="your_name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" 
                                name="email" 
                                id="email" 
                                placeholder="Your MailID" 
                                error={errors.email} 
                                //Handle the errors validation 
                                className={classnames("", {
                                    invalid: errors.email || errors.emailnotfound
                                    })}
                                    //handle the change in input using onChange
                                onChange={this.onChange}/>
                                {/* styling for the error  */}
                                <span className="red-text">
                                {errors.email}
                                {errors.emailnotfound}
                                </span>
                            </div>
                            <div className="form-group">
                                <label for="your_pass"><i className="zmdi zmdi-lock"></i></label>
                                <input type="password" 
                                name="password" 
                                id="password" 
                                placeholder="Password" 
                                // handling the errors in password 
                                error={errors.password} 
                                className={classnames("", {
                                    invalid: errors.password || errors.passwordincorrect
                                    })}
                                onChange={this.onChange}/>
                                {/* syling for the error to be thrown */}
                                <span className="red-text">
                                {errors.password}
                                {errors.passwordincorrect}
                                </span>
                            </div>
                              {/* Button to submit the login form which validates and navigates us to the dashboard (Homepage) */}
                            <div className="form-group form-button">
                                <input type="submit" name="signin" id="signin" className="form-submit" value="Log in"/>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
        </section> 
)
}
}
//Defining PropTypes
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
// Allows us to get our state from redux and map it to props 
// and can be used inside our component
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  
  export default connect(
    mapStateToProps,
    { loginUser }
  )(Login);


