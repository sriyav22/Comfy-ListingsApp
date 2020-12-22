import React from "react";
import './card.css';
import axios from 'axios';

import Modal from '../Navbar/Modal';
import ViewListing from './ViewListing';
import PropTypes from "prop-types";
import { connect } from "react-redux";



        class MyCard extends React.Component {

            state = { show: false };

            showModal = (entry) => {
                this.setState({ show: true , entry : entry});
              };

            hideModal = () => {
                this.setState({ show: false });
            };
           

            deleteRoomListing = (id) => {
                // const { listing } = this.state;
                console.log(id);
                axios.delete("http://localhost:5000/listings/"+`${id}`)
                .then(response => {
                    console.log(response);
                });
                // this.props.history.push(`/MyListings/${this.props.auth.user.id}`);
                window.location.reload();
            };

            updateRoomListing = (id) => {
                window.location.href=`/UpdateListings/${id}`;
                 
            };
            
            render() {
                return(   
                    <div class="col-sm-4 mt-5 " >
                        
                        <Modal show={this.state.show} handleClose={this.hideModal}>
                        {this.state.entry === "ViewListing" && <ViewListing listing={this.props.room}/>} 
                        </Modal>
                       
                        <div class="card promoting-card ">
                            
                        <div class ="action-icons">
                        <ul class="list-inline m-0">
                            <li class="list-inline-item">
                                <button class="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit"><i class="fa fa-edit"
                                onClick = {()=>this.updateRoomListing(this.props.room.id)}></i></button>    
                            </li>
                            <li class="list-inline-item">
                                <button class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"
                                onClick={()=>this.deleteRoomListing(this.props.room.id)}></i></button>
                            </li>
                        </ul>
                        </div>
                        <div>
                        <div class="card-body">                     
                            <div>
                                <h4 class="card-title font-weight-bold mb-2">{this.props.room.roomType} Room Available</h4>
                                <p class="card-text">Posted by: {this.props.room.hostInformation.name}</p>
                            </div>
                        </div>

                        
                        <div class="view overlay">
                            <img class="card-img-top rounded-0" src={this.props.room.selectedFile} alt="Card image cap" />
                            <a href="#!">
                            <div class="mask rgba-white-slight"></div>
                            </a>
                        </div>



                            <div className="card-body">

                                <div class="collapse-content">                            
                                    <p class="card-text " id="collapseContent">Location: {this.props.room.address.addressLine1} , {this.props.room.address.city}, {this.props.room.address.state}</p>                           
                                    <button onClick={() => this.showModal('ViewListing')} >More Information</button> 
                                </div>

                            </div>
                        </div>
                        </div>
                     
</div>
);
            }                                                                    
        }
        MyCard.propTypes = {
            auth: PropTypes.object.isRequired
        };
        const mapStateToProps = state => ({
            auth: state.auth
        });
        export default connect(
            mapStateToProps
        )(MyCard);