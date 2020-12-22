import React, { Component } from 'react'
import { Link,withRouter} from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../Store/actions/authActions";
import classnames from "classnames";

//Sign up component is for the first time user to create an account
class Signup extends Component {
    constructor() {
        super();
// Required fields for user registration
        this.state = {
            username: "",
            email: "",
            password: "",
            createdDate: "",
            errors:{}
        }

    }
// to reset the state in the store whenever the prop changes and navigate to dashboard
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }
//handles the input by the user and update them using the setState
    handleInputChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };
//Once we cilck on submit button we store the user details using registerUser
    
    handleSubmit = (e) => {
        e.preventDefault();
        
        const newUser = {
           username : this.state.username,
           email : this.state.email,
           password :this.state.password
        };

        this.props.registerUser(newUser, this.props.history); 
  };
        
    render() {

        const { errors } = this.state;

        return (
          //Root element for this DOM tree is section
            <section className="signup">
              <div className="container2">
                <div className="signup-content">
                  <div className="signup-form">
                              <h2 className="form-title">Sign up</h2>
                                {/* this div contains the Sign up form and handleSubmit handler is invoked on submitting the form */}
                              <form className="register-form" id="register-form" onSubmit={this.handleSubmit}>
                                  <div className="form-group">
                                      <label for="name"><i className="zmdi zmdi-accounts material-icons-name"></i></label>
                                      <input type="text" 
                                      name="username" 
                                      id="username" 
                                      placeholder="Your Name" 
                                      defaultValue={this.state.username} 
                                      error={errors.username} 
                                      //handling the Errors occured in Username
                                      className={classnames("", {
                                      invalid: errors.username
                                      })} 
                                      //handling the Errors occured in email format
                                      onChange={this.handleInputChange} />
                                      <span className="red-text">{errors.email}</span>
                                  </div>
                                  <div className="form-group">
                                      <label for="email"><i className="zmdi zmdi-email"></i></label>
                                      <input type="email" 
                                      name="email" 
                                      id="email" 
                                      placeholder="Your Email" 
                                      defaultValue={this.state.email} 
                                      error={errors.email} 
                                      className={classnames("", {
                                        invalid: errors.email
                                        })}
                                    //handle the change in input values of the user email
                                      onChange={this.handleInputChange} />                              
                                      <span className="red-text">{errors.email}</span>
                                        </div>
                                         <div className="form-group">
                                      <label for="pass"><i className="zmdi zmdi-lock"></i></label>
                                      <input type="password" 
                                      name="password" 
                                      id="password" 
                                      placeholder="Password" 
                                      defaultValue={this.state.password} 
                                      error={errors.password}
                                      //displays the errors if password in invalid
                                      className={classnames("", {
                                        invalid: errors.password
                                        })} 
                                         //handle the change in input values of the user password
                                      onChange={this.handleInputChange} />
                                      
                                      <span className="red-text">{errors.password2}</span>
                                  </div>
                                   {/* on clicking the submit button the form is submitted - user is registered  */}
                                  <div className="form-group form-button">
                                  <input type="submit" name="signup" id="signup" className="form-submit" value= "Sign up"></input>
                                  </div>
                              </form>  
                          </div> 
                      <div>
                          <figure>
                            <img src="images/signup-image.jpg" alt="Sign up"></img>
                          </figure> 
                      </div>
                  </div>
              </div>
            </section>

        )
    }
}
//Defining PropTypes
Signup.propTypes = {
    registerUser: PropTypes.func.isRequired,
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
    { registerUser }
  )(withRouter(Signup));