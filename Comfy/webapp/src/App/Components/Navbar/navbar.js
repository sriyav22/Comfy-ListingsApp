import React from "react";
import Modal from './Modal';
import Login from '../Login/login'
import Signup from '../Registration/Signup'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../Store/actions/authActions";

import '../Homepage/homepage.css';
import './modal.css';

class NavbarComponent extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this); 
    }
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
      };

    state = { show: false };


  showModal = (entry) => {
    this.setState({ show: true , entry : entry});
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  handleClick = () => {
    
    this.props.history.push(`/MyListings/${this.props.auth.user.id}`);
};
handleAddRoom = () => {
    
    this.props.history.push(`/CreateRoom/${this.props.auth.user.id}`);
};
    render() {
        return(
            <div> 
                 <Modal show={this.state.show} handleClose={this.hideModal}>
                    {this.state.entry === "login" && <Login />} 
                    {this.state.entry === "signup" && <Signup />} 
                 </Modal>
                    <nav class="navbar navbar-expand-lg navbar-light fixed-top colorbg ">
                    <a class="navbar-brand fontstyle" href="/"><i class="fas fa-home"> Comfy</i></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">

                    <span class="navbar-toggler-icon"></span>

                    </button>
                    <div className="collapse navbar-collapse"  id="navbarNav ">

                        {/* <Fade left cascade> */}
                        {JSON.stringify(this.props.auth.user) === '{}'&&
                        
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <a className="nav-link cursor" onClick={() => this.showModal('login')}>Login</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link cursor" onClick={() => this.showModal('signup')}>Sign Up</a>
                            </li>
                        </ul> }
                        {/* </Fade> */}

                        {JSON.stringify(this.props.auth.user) !== '{}'&&
                        <ul className="navbar-nav ml-auto fontcolor">
                            <li className="nav-item active">
                                <a className="nav-link fontcolor " href="/ViewRoom/">Browse Rooms <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item active fontcolor">
                                <a className="nav-link " href="/favorites/">My Favorites <span className="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item active">
                                <a class="nav-link cursor" history={this.props.history} 
                                onClick={() => {this.handleAddRoom()
                                }}>Add New Room Posting</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link cursor" history={this.props.history} onClick={() => {
                                this.handleClick()
                                }}>View My Listings</a>
                            </li>

                            <li className="nav-item active">
                                <a className="nav-link cursor" onClick={this.onLogoutClick} >Logout</a>
                            </li> 
                        </ul>}

                    </div>
                    </nav> 
               </div>
            
        )
    }
}

    NavbarComponent.propTypes = {
        logoutUser: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
    };
    const mapStateToProps = state => ({
        auth: state.auth
    });
    export default connect(
        mapStateToProps,
        { logoutUser }
    )(NavbarComponent);