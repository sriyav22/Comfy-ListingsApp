import React from "react";
import './card.css';
import Modal from '../Navbar/Modal';
import ViewListing from './ViewListing';
import PropTypes from "prop-types";
import { connect } from "react-redux";

        class Card extends React.Component {
            
            //Assigning state to show and filtered city
            state = {
                show: false ,
                favorite: false
            };

            //This function is called when the more details button is clicked and here the state of show is set to true and entry is set to entry.
            showModal = (entry) => {
                this.setState({ show: true , entry : entry});
            };

            //This function is called to hide the modal, here the state of show is set to false.
            hideModal = () => {
                this.setState({ show: false });
            };
            
            //On component load, first it is checked if there are any room listing with the favorite object and if the user favorited 
            //is same as the user logged in then the state of favorite is set to true
            componentDidMount() {
                if(this.props.room.Favorite && this.props.room.Favorite.isFavorite && this.props.room.Favorite.byUser === this.props.auth.user.id){
                    this.setState({
                        favorite: true
                    })
                }
            }


            //The favorited function is called when the favorite icon is clicked and here the room objects; isFavorite state is set to true
            //and the byUser is set to the id of the user logged in. 
            favorited = () => {         
                let room = {
                    ...this.props.room,
                    Favorite:{
                        isFavorite : !this.state.favorite,
                        byUser : this.props.auth.user.id
                    }
                }

                //The state of favorite is set to the opposite boolean
                this.setState({
                    favorite: !this.state.favorite
                })

                //The API call with method PUT, is called passing the room id as part of the URL, and the body should be JSON.
                    fetch(`${'http://localhost:5000/listings'}/${room.id}`, {
                      method: 'PUT',
                      body: JSON.stringify(room),
                      headers: {
                          'content-type': 'application/json'
                      }
                  })
                  window.location.reload();
              }

            render() {
                return(   
                    //As part of the grid layout, the column value is set here, defining one column to 4 columns
                    <div className="col-sm-4 mt-5 ">


                        {/* The modal component is called when the more details button is clicked and the ViewListing component is called */}
                        <Modal show={this.state.show} handleClose={this.hideModal}>
                        {this.state.entry === "ViewListing" && <ViewListing listing={this.props.room}/>} 
                        </Modal>

                       {/* This block of code is to define the card layout, where each of the information of the room is mapped to 
                       certain values to be displayed in the card layout. Along with the more details button which when clicked 
                       pops up a modal with information and the I like it, favorite icon which inturn calls the update api call*/}
                        <div className="card promoting-card ">

                        <div className="card-body">                     
                            <div>
                                <h4 className="card-title font-weight-bold mb-2">{this.props.room.roomType} Room Available</h4>
                                <p className="card-text">Posted by: {this.props.room.hostInformation.name}</p>
                            </div>
                        </div>
  
                        <div className="view overlay">
                            <img className="card-img-top rounded-0" src={this.props.room.selectedFile} alt="Card image cap" />
                            <a href="#!">
                            <div className="mask rgba-white-slight"></div>
                            </a>
                        </div>
 
                        <div className="card-body">
                            <div class="collapse-content">                            
                                <p class="card-text " id="collapseContent">Location: {this.props.room.address.addressLine1} , {this.props.room.address.city}, {this.props.room.address.state}</p>                           
                                <i class={`fas fa-heart float-right p-1 my-1 mr-3 ${this.state.favorite ? "after-favorite-color" : "favorite-color"}`} onClick = {this.favorited} data-toggle="tooltip" data-placement="top" title="I like it"></i>
                                <button onClick={() => this.showModal('ViewListing')} >More Information</button> 
                            </div>
                        </div>
                        </div>
                    </div>
                  
                );
            }                                                                    
        }

        //Defining propTypes
        Card.propTypes = {
            auth: PropTypes.object.isRequired
        };

        //mapStateToProps allows us to get our state from Redux and map it to props which we can use inside components
        const mapStateToProps = state => ({
            auth: state.auth
        });

        //export function to export the props along with the component.
        export default connect(
            mapStateToProps
        )(Card);