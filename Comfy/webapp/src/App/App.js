import './App.css';
import React, {Component, useEffect }from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainComponent from './Components/Homepage/homepage';
import Signup from './Components/Registration/Signup';
import Login from './Components/Login/login';
import MyListings from './Components/Listings/MyListings';
import Successful from './Components/Roomlistings/Successful'
import { useDispatch } from 'react-redux';
import Roomlistings from './Components/Roomlistings/Roomlistings';


import BrowseComponent from './Components/Listings/Listings';
import ViewFavoritesComponent from './Components/Listings/ViewFavorites';

import jwt_decode from "jwt-decode";
import setAuthToken from "./Store/utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./Store/actions/authActions";
import { fetchListings } from "./Store/actions/listingActions";

import {Provider} from "react-redux";
import store from './Store/store';
import UpdateRoomlistings from './Components/Roomlistings/UpdateRoomlistings';


// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}






class App extends Component {
  constructor(props){
    super(props)
     this.state = {
     }
    }
    
    render(){  
      console.log(this.props)        
    return (

      <Provider store={store}>
      <div className="App">

                <Route exact path="/" component={MainComponent}/>
                <Route path="/Signup"
                   exact={true}
                   render={() => {
                       return [
                           <Signup
                              />]
                   }
                   }/>
                <Route path="/Login"
                   exact={true}
                   render={() => {
                       return [
                           <Login

                              // LoginUser={this.LoginUser}
                              />]
                   }
                   }/>
                   <Route path="/CreateRoom/:id"

                   exact={true}
                   render={() => {
                       return [
                           <Roomlistings 
                              //  LoginUser={this.LoginUser}
                              />]
                   }
                   }/>

                <Route path="/ViewRoom"
                   exact={true}
                   render={(props) => {
                       return [
                           <BrowseComponent
                           {...props}/>]
                   }
                  }/>
{/* Show my lisings by passing in the logged in user ID */}
                <Route path="/MyListings/:id"
                                  exact={true}
                                  render={(props) => {
                                      return [
                                          <MyListings {...props}
                                          />]
                                  }
                                }/>

                  <Route path="/ViewRoom/:filteredCity"
                   exact={true}
                   render={(props) => {
                       return [
                           <BrowseComponent
                           {...props}/>]
                   }
                  }
                  />
                  <Route path="/d"
                   exact={true}
                   render={() => {
                       return [
                           <Successful
                              />]
                        }
                   }/>

                  <Route path="/favorites"
                   exact={true}
                   render={(props) => {
                       return [
                           <ViewFavoritesComponent
                           {...props}/>]
                   }
                  }
                  />

      


                  <Route path="/UpdateListings/:id"
                   exact={true}
                   render={(props) => {
                       return [
                           <UpdateRoomlistings
                           {...props}/>]
                   }
                  }
                  />

      </div>
  

  </Provider>
    )
  }
}
export default App;
