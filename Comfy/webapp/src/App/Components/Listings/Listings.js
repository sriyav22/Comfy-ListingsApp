import React from 'react';
import { useSelector } from 'react-redux';


import FooterComponent from '../Footer/footer'
import NavbarComponent from '../Navbar/navbar';
import Card from './Card';
import { fetchListings } from "../../Store/actions/listingActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../Store/actions/authActions";
        class BrowseComponent extends React.Component {

            //Assigning state to filteredCity
            state = {
                filteredCity: '',
            }
            
            //This function is called on load and fetches all the listings in the db. Also as part of the url we are passing filteredCity 
            //and if the url contains the filteredCity then the state filteredCity gets assigned with the value passed in the url
            componentDidMount() {
                this.props.fetchListings() 
                if(this.props.match){
                    const { filteredCity } = this.props.match.params
                    this.setState({
                        filteredCity: filteredCity
                    })
                }               
              }

              // This function is called everytime there is some update in the component. In this case, if the user object's length 
              // is 0 then homepage componet is called.
              componentDidUpdate(){
                  console.log(this.props.auth)
                  if(Object.keys(this.props.auth.user).length === 0){
                      window.location.href = "/"
                  }
              }
              
            render() {
                return(
                    <div>
                        {/* The navbar component is called */}
                        <NavbarComponent history={this.props.history}/>
                        <div className = "container mt-5">

                            {/* Aligning the data in the screen in a grid format */}
                            <div className = "row">

                                {/* This section of code is called when the user clicks on Browse Rooms from the homepage. Here,
                                the block of code is called even if the state of filtered city is not set, provided there are Listings
                                and then each listing is mapped to the room object and id to index. */}
                                {!this.state.filteredCity && 
                                    this.props.listings && 
                                        this.props.listings.map((room , index) => (
                                            <Card room = {room} />
                                ))}

                                {/* This section of code is called when the user clicks on searches the listing with a city
                                 from the homepage. Here,the block of code is called if the state of filtered city is set, provided there are Listings
                                and then each listing is mapped to the room object and id to index. */}
                                {this.state.filteredCity && 
                                    this.props.listings && 
                                    this.props.listings.map((room , index) => {
                                        if(room.address.city === this.state.filteredCity) {
                                            return (<Card room = {room} />)
                                        }    
                                })}    
                            </div>
                        </div>
                        {/* The footer component is called */}
                        <FooterComponent />
                    </div>          
                );
            }
        }                                                                        

        //Defining propTypes
        BrowseComponent.propTypes = {
            fetchListings: PropTypes.func.isRequired,
            logoutUser: PropTypes.func.isRequired,
            auth: PropTypes.object.isRequired,
            listings : PropTypes.object.isRequired,
            
        };

        //mapStateToProps allows us to get our state from Redux and map it to props which we can use inside components
        const mapStateToProps = state => ({
            auth: state.auth,
            listings : state.listings
        });

        //export function to export the props, fetchListings function, logoutUser function along with the component.
        export default connect(
            mapStateToProps,
            { fetchListings , logoutUser}
        )(BrowseComponent);


