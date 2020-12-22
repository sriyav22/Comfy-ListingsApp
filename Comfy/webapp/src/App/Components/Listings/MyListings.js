
import React from 'react';
import { useSelector } from 'react-redux';
// import Listing from '../Listings/Listing';
// import React from "react";
import FooterComponent from '../Footer/footer';
import NavbarComponent from '../Navbar/navbar';
import MyCard from './MyCard';
import { fetchListings } from "../../Store/actions/listingActions";
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";

        class MyListings extends React.Component {

            state = {
                userID: ''
            }
            
            componentDidMount() {
                this.props.fetchListings() 
                if(this.props.match){
                    const { userID } = this.props.match.params
                    this.setState({
                        userID: userID
                    })
                }  
          
              }
              componentDidUpdate(){
                console.log(this.props.auth)
                if(Object.keys(this.props.auth.user).length === 0){
                    window.location.href = "/"
                }
            }    
  


   
              
            render() {
                
                return(
                    <div>
                        
                        <NavbarComponent history={this.props.history}/>
                        <div className = "container mt-5">
                            <div className = "row">
                                {!this.props.auth.user.id && this.props.listings && this.props.listings.map((room , index) => (
                            
                                 <MyCard history={this.props.history} room = {room} />
                                
                                ))}

                                {this.props.auth.user.id && 
                                    this.props.listings && 
                                    this.props.listings.map((room , index) => {
                                        console.log(room)
                                        if(room.createdBy === this.props.auth.user.id) {
                                            return (<MyCard room = {room} />)
                                        }
                                })}

                                
                            </div>
                        </div>
                        <FooterComponent />
                    </div>          
                );
            }
        }                                                                        

        MyListings.propTypes = {
            fetchListings: PropTypes.func.isRequired,
            auth: PropTypes.object.isRequired,
            listings : PropTypes.object.isRequired
        };
        const mapStateToProps = state => ({
            auth: state.auth,
            listings : state.listings
        });
        export default connect(
            mapStateToProps,
            { fetchListings }
        )(MyListings);

