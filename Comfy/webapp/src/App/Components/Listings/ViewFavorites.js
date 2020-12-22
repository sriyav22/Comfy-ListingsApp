
import React from 'react';
import NavbarComponent from '../Navbar/navbar';
import Card from './Card';
import { fetchListings } from "../../Store/actions/listingActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../Store/actions/authActions";
import FooterComponent from '../Footer/footer'

        class ViewFavoritesComponent extends React.Component {
             
            // This function is called everytime there is some update in the component. In this case, if the user object's length 
            // is 0 then homepage componet is called.
              componentDidUpdate(){
                if(Object.keys(this.props.auth.user).length === 0){
                    window.location.href = "/"
                }
            }
            
            //This function is called on load and fetches all the listings in the db.
            componentDidMount() {
                this.props.fetchListings()    
            }
              
            render() {
                return(
                    <div>
                        {/* The navbar component is called */}
                        <NavbarComponent history={this.props.history}/>

                        {/* Aligning the data in the screen in a grid format */}
                        <div className = "container mt-5">
                            <div className = "row">
                            { 
                                // This section checks if there are listings and then maps each listing to the room object and id to index
                                // and also the room should have a favorite value which should be true and the user favorited should be 
                                // same as the logged in user.
                                this.props.listings && 
                                this.props.listings.map((room , index) => {
                                    if(room.Favorite && room.Favorite.isFavorite == true && this.props.auth.user.id === room.Favorite.byUser) {
                                        //card componet is called and the room object is passed along with it
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
        ViewFavoritesComponent.propTypes = {
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
        )(ViewFavoritesComponent);

