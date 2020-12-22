import React, { Component, useState } from 'react';
import { connect } from "react-redux";
import FileBase from 'react-file-base64';
import { createListing } from '../../Store/actions/listingActions';
import { logoutUser } from "../../Store/actions/authActions";
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom';
import NavbarComponent from '../Navbar/navbar';
import './Roomlistings.css';
import Modal from '../Navbar/Modal';
import Successful from './Successful';
import FooterComponent from '../Footer/footer';

// Roomlistings component is to create a room posting  by the logged in user 
class Roomlistings extends React.Component {
  //AddnewRoom contains all the details to create a room posting
  //intialized inside the constructor
  constructor(props) {
    super(props)
    this.state = {
      Addnewroom: {
        address: {
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          zipCode: ""
        },
        Amenities: {
          inUnitWasher: false,
          AC: false,
          TV: false,
          wifiIncluded: false,
          privateBathroom: false
        },
        hostInformation: {
          name: "",
          phone: "",
          university: "",
          gender: ""
        },
        roommateRules: {
          noDrinking: false,
          noSmoking: false,
          noDrugs: false,
          noPets: false
        },
        Leasingterm: "",
        roomType: "",
        totalNoOfBedrooms: "",
        totalNoOfBathrooms: "",
        AboutNeighborhood: "",
        preferredAge: "",
        preferredGender: "",
        roommateDescription: "",
        selectedFile: "",
        createdBy: this.props.auth.user.id
      },
      //Modal is not popped up by default
      show: false
    }
    //bind all the handlers in the component
    this.handleInputChangeAddress = this.handleInputChangeAddress.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputChangeAmenities = this.handleInputChangeAmenities.bind(this)
    this.handleInputChangeroomaterules = this.handleInputChangeroomaterules.bind(this)
    this.handleInputChangehostInfo = this.handleInputChangehostInfo.bind(this)
    this.handleImageChange = this.handleImageChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  //On updating the component this method is invoked   
  componentDidUpdate() {
    console.log(this.props.auth)
    if (Object.keys(this.props.auth.user).length === 0) {
      window.location.href = "/"
    }
  }
  //validate function to handle all the errors required for validation
  validate = () => {
    let nameError = "";
    let phoneError = "";
    let genderError = "";
    let universityError = "";
    let Line1Error = "";
    let StateError = "";
    let roomtypeError = "";
    let LeasingtermError = "";
    let preferredGenderError = "";

    // validating the Leasingterm
    if (!this.state.Addnewroom.Leasingterm) {
      LeasingtermError = "select the leasing term";
    }
    // validating the preferredGenderErr
    if (!this.state.Addnewroom.Leasingterm) {
      preferredGenderError = "select the preferredGender";
    }
    //validating the host name
    if (!this.state.Addnewroom.hostInformation.name) {
      nameError = "name cannot be left blank";
    }
    //validating the phone no of host
    if (!this.state.Addnewroom.hostInformation.phone) {
      phoneError = "phoneno cannot be left blank";
    }
    //validating the gender
    if (!this.state.Addnewroom.hostInformation.gender) {
      genderError = "Select a gender";
    }
    //validating the university      
    if (!this.state.Addnewroom.hostInformation.university) {
      universityError = "university cannot be left blank";
    }
    //validating the addressLine1      
    if (!this.state.Addnewroom.address.addressLine1) {
      Line1Error = "addressLine1 cannot be left blank";
    }
    //validating the state field of the address 
    if (!this.state.Addnewroom.address.state) {
      StateError = "State cannot be left blank";
    }
    //validating the state field of the address 
    if (!this.state.Addnewroom.roomType) {
      roomtypeError = "select the type of Room";
    }
    //even if there is one error the form will be invalid
    if (phoneError || nameError || genderError || universityError || Line1Error || StateError || roomtypeError || preferredGenderError || LeasingtermError) {
      this.setState({ phoneError, nameError, genderError, universityError, Line1Error, StateError, roomtypeError, preferredGenderError, LeasingtermError });
      return false;
    }
    //returns true if the form is valid with no errors      
    return true;
  };


  // handles the changes in the input to the Address section field and updates state of Addnewroom
  handleInputChangeAddress(e) {
    let Addnewroom = {
      ...this.state.Addnewroom,

      address: {
        ...this.state.Addnewroom.address,
        [e.target.name]: e.target.value
      }
    }
    this.setState({ Addnewroom })
  }


  // handles the changes in the input to the amenities section fields and updates state of Addnewroom
  handleInputChangeAmenities(e) {
    let Addnewroom = {
      ...this.state.Addnewroom,
      Amenities: {
        ...this.state.Addnewroom.Amenities,
        [e.target.name]: e.target.checked
      }
    }
    this.setState({ Addnewroom })
  }
  // handles the changes in the input to the general details section fields and updates state of Addnewroom
  handleInputChange(e) {
    let Addnewroom = {
      ...this.state.Addnewroom,
      [e.target.name]: e.target.value
    }
    this.setState({ Addnewroom })
  }
  //handles the changes in the input to the roommateRules details section fields and updates state of Addnewroom
  handleInputChangeroomaterules(e) {
    let Addnewroom = {
      ...this.state.Addnewroom,
      roommateRules: {
        ...this.state.Addnewroom.roommateRules,
        [e.target.name]: e.target.checked
      }
    }
    this.setState({ Addnewroom })
  }

  //handles the changes in the input to the hostinformation details section fields and updates state of Addnewroom
  handleInputChangehostInfo(e) {
    let Addnewroom = {
      ...this.state.Addnewroom,

      hostInformation: {
        ...this.state.Addnewroom.hostInformation,
        [e.target.name]: e.target.value
      }

    }
    this.setState({ Addnewroom })
  }
  //handles the changes in the input to the image to be uploaded details section fields and updates state of Addnewroom
  handleImageChange(e) {
    let Addnewroom = {
      ...this.state.Addnewroom,
      selectedFile: e
    }
    this.setState({ Addnewroom })
  }
  // invoked on submitting the form event occurs 
  handleSubmit = (event) => {

    event.preventDefault();
    // setting the values given in input when submit event is invoked
    const NewRoom = {

      addressLine1: this.state.Addnewroom.address.addressLine1,
      addressLine2: this.state.Addnewroom.address.addressLine2,
      city: this.state.Addnewroom.address.city,
      state: this.state.Addnewroom.address.state,
      zipCode: this.state.Addnewroom.address.zipCode,

      inUnitWasher: this.state.Addnewroom.Amenities.inUnitWasher,
      AC: this.state.Addnewroom.Amenities.AC,
      TV: this.state.Addnewroom.Amenities.TV,
      wifiIncluded: this.state.Addnewroom.Amenities.wifiIncluded,
      privateBathroom: this.state.Addnewroom.Amenities.privateBathroom,
      Elevator: this.state.Addnewroom.Amenities.Elevator,

      noDrinking: this.state.Addnewroom.roommateRules.noDrinking,
      noSmoking: this.state.Addnewroom.roommateRules.noSmoking,
      noDrugs: this.state.Addnewroom.roommateRules.noDrugs,
      noPets: this.state.Addnewroom.roommateRules.noPets,

      name: this.state.Addnewroom.hostInformation.name,
      phone: this.state.Addnewroom.hostInformation.phone,
      university: this.state.Addnewroom.hostInformation.university,
      gender: this.state.Addnewroom.hostInformation.gender,

      Leasingterm: this.state.Addnewroom.Leasingterm,
      roomType: this.state.Addnewroom.roomType,
      totalNoofBedrooms: this.state.Addnewroom.totalNoofBedrooms,
      totalNoofBathrooms: this.state.Addnewroom.totalNoofBathrooms,

      AboutNeighborhood: this.state.Addnewroom.AboutNeighborhood,
      preferredAge: this.state.Addnewroom.preferredAge,
      preferredGender: this.state.Addnewroom.preferredGender,
      roommateDescription: this.state.Addnewroom.roommateDescription,
      selectedFile: this.state.Addnewroom.selectedFile
    }
    //checking if there are any errors by calling the validate function

    const isValid = this.validate();
    if (isValid) {
      console.log("validated");
      this.showModal("successful"); 
    }
    else {
      console.log("Failed in validation")
    }

    this.props.createListing(this.state.Addnewroom);

  }
  // ShowModal methods on invoking will show the modal
  showModal = (entry) => {
    this.setState({ show: true, entry: entry });
  };
  // hideModal methods on invoking will close modal
  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div>
        {/* Modal component invokes the show and handleClose  on calling them */}
        <Modal show={this.state.show} handleClose={this.hideModal}>
          {this.state.entry === "successful" && <Successful />}
        </Modal>
        <NavbarComponent history={this.props.history} />
        <div className="container2">
          <div className="content">
            <div className="listingform">
              <h2 className="roomtitle">Room Details</h2>
              {/* The contents are present in the form div */}
              <form className="roomform" id="Room-form">
                <div>
                  <div id="location">
                    {/* The contents related to the address of the property are present in this div */}
                    <h4>Location</h4>
                    <br></br>
                    <div className="row">
                      <div className="col">
                        {/* <div><b>Address Line1 :</b> */}
                        {/* Address Line 1 is mandatory */}
                        <input type="text" name="addressLine1" className="form-control" id="AddressLine1" placeholder="AddressLine1" onChange={this.handleInputChangeAddress} required></input>
                        <div className="required">
                          {this.state.Line1Error}
                        </div>

                      </div>
                      {/* Address Line 2 is optional*/}
                      <div className="col">

                        <input type="text" name="addressLine2" className="form-control" id="AddressLine2" placeholder="AddressLine2" onChange={this.handleInputChangeAddress}></input>
                      </div>
                    </div>
                    <br></br>
                    <div className="row">
                      {/* city is mandatory*/}
                      <div className="col">
                        <input type="text" name="city" className="form-control" id="city" placeholder="City" onChange={this.handleInputChangeAddress} required></input>
                      </div>
                      {/* state  is mandatory*/}
                      <div className="col">
                        <input type="text" name="state" className="form-control" id="state" placeholder="State" onChange={this.handleInputChangeAddress} required="required"></input>
                        <div className="required">
                          {this.state.StateError}
                        </div>
                      </div>
                      {/* zipcode  is mandatory*/}
                      <div className="col">
                        <input type="text" name="zipCode" className="form-control" id="zipcode" placeholder="zipcode" onChange={this.handleInputChangeAddress} required></input>
                      </div>
                    </div>
                  </div>
                  <br></br>
                  <div id="generaldetails">
                    <h4>About the Property</h4>
                    <div class="layout-inline">
                      {/* Lease Term is mandatory*/}
                      <div><b>Lease Term</b>
                        <div class="form-check custom-control radio-width">
                          <input type="radio" class="form-check-input" id="longTerm" name="Leasingterm" value="Long term" onChange={this.handleInputChange}></input>
                          <label class="form-check-label" for="Leasingterm">Long</label>
                          <div className="required">
                            {this.state.LeasingtermError}
                          </div>
                        </div>
                        <div class="form-check custom-control radio-width">
                          <input type="radio" class="form-check-input" id="shortTerm" name="Leasingterm" value="Short term" onChange={this.handleInputChange}></input>
                          <label class="form-check-label" for="Leasingterm">Short</label>
                        </div>
                      </div>
                      <div><b>Room Type</b>
                        {/* Room Type is mandatory*/}
                        <div class="form-check custom-control radio-width">
                          <input type="radio" class="form-check-input" id="entire" name="roomType" value="Entire" onChange={this.handleInputChange} ></input>
                          <label class="form-check-label" for="roomType">Entire</label>
                        </div>
                        <div class="form-check custom-control radio-width">
                          <input type="radio" class="form-check-input" id="shared" name="roomType" value="Shared" onChange={this.handleInputChange} ></input>
                          <label class="form-check-label" for="roomType">Shared</label>
                        </div>
                        <div class="form-check custom-control radio-width">
                          <input type="radio" class="form-check-input" id="private" name="roomType" value="Private" onChange={this.handleInputChange}></input>
                          <label class="form-check-label" for="roomType">Private</label>
                        </div>
                        <div className="required">
                          {this.state.roomtypeError}
                        </div>
                      </div>
                    </div>
                    {/* About Neighborhood  Term is optional - describe all the facilties available to help us with daily life*/}
                    <div class="form-group"><b>About Neighborhood</b>
                      <textarea class="form-control rounded-0" id="AboutNeighborhood" name="AboutNeighborhood" onChange={this.handleInputChange} rows="3"></textarea>
                    </div>
                    <div class="form-group"><b>Preferred Age</b>
                      <input class="form-control" type="number" name="preferredAge" id="preferredAge" onChange={this.handleInputChange}></input>
                    </div>
                    {/* Preferred Gender - mandatory*/}

                    <div><b>Preferred Gender</b>
                      <div class="form-check custom-control">
                        <input type="radio" class="form-check-input" id="Male" name="preferredGender" value="male" onChange={this.handleInputChange} ></input>
                        <label class="form-check-label" for="Male">Male</label>
                      </div>
                      <div class="form-check custom-control">
                        <input type="radio" class="form-check-input" id="Female" name="preferredGender" value="female" onChange={this.handleInputChange}></input>
                        <label class="form-check-label" for="Female">Female</label>
                      </div>
                      <div className="required">
                        {this.state.preferredGenderError}
                      </div>
                    </div>
                    <div className="row">
                      {/* Number of Bedrooms in the house - number */}
                      <div className="col"><b>Number of bedrooms</b>
                        <input type="number" name="totalNoOfBedrooms" className="form-control" id="totalNoOfBedrooms" min="0" max="20" onChange={this.handleInputChange}></input>
                      </div>
                      {/* Number of Bathrooms in the house - number*/}
                      <div className="col"><b>Number of bathrooms</b>
                        <input type="number" name="totalNoOfBathrooms" className="form-control" id="totalNoOfBathrooms" min="1" max="20" onChange={this.handleInputChange}></input>
                      </div>
                    </div>

                    <div class="form-group"><b>Describe your ideal roommate</b>
                      <textarea class="form-control rounded-0" id="roommateDescription" name="roommateDescription" onChange={this.handleInputChange} rows="2"></textarea>
                    </div>
                  </div>
                  <br></br>
                  <div id="amenities">
                    {/* All the facilities like Washer, TV, AC, wifi,private bathrooom */}
                    <h4>Amenities</h4>
                    <div class="form-check-inline custom-control align-checkbox">
                      <input type="checkbox" class="form-check-input" id="inUnitWasher" name="inUnitWasher" checked={this.inUnitWasher} onChange={this.handleInputChangeAmenities}></input>
                      <label class="form-check-label " for="inUnitWasher">inUnitWasher</label>
                    </div>
                    <div class="form-check-inline custom-control align-checkbox">
                      <input type="checkbox" class="form-check-input" id="AC" name="AC" checked={this.AC} onChange={this.handleInputChangeAmenities}></input>
                      <label class="form-check-label " for="AC">AC</label>
                    </div>
                    <div class="form-check-inline custom-control align-checkbox">
                      <input type="checkbox" class="form-check-input" id="TV" name="TV" checked={this.TV} onChange={this.handleInputChangeAmenities}></input>
                      <label class="form-check-label " for="TV">TV</label>
                    </div>

                    <div class="form-check-inline custom-control align-checkbox">
                      <input type="checkbox" class="form-check-input" id="wifiIncluded" checked={this.wifiIncluded} onChange={this.handleInputChangeAmenities} name="wifiIncluded"></input>
                      <label class="form-check-label " for="wifiIncluded">wifiIncluded</label>
                    </div>
                    <div class="form-check-inline custom-control align-checkbox">
                      <input type="checkbox" class="form-check-input" id="privateBathroom" name="privateBathroom" checked={this.privateBathroom} onChange={this.handleInputChangeAmenities}></input>
                      <label class="form-check-label " for="privateBathroom">privateBathroom</label>
                    </div>
                  </div>
                  <br></br>
                  {/* All the Roommate rules no drinking,no pets,no smoking and no pets*/}
                  <div id="roommateRules">
                    <h4>roommateRules</h4>
                    <div class="form-check custom-control">
                      <input type="checkbox" class="form-check-input" id="noDrinking" name="noDrinking" checked={this.noDrinking} onChange={this.handleInputChangeroomaterules}></input>
                      <label class="form-check-label" for="noDrinking">noDrinking</label>
                    </div>

                    <div class="form-check custom-control">
                      <input type="checkbox" class="form-check-input" id="noSmoking" name="noSmoking" checked={this.noSmoking} onChange={this.handleInputChangeroomaterules} ></input>
                      <label class="form-check-label" for="noSmoking">noSmoking</label>
                    </div>

                    <div class="form-check custom-control">
                      <input type="checkbox" class="form-check-input" id="noDrugs" name="noDrugs" checked={this.noDrugs} onChange={this.handleInputChangeroomaterules} ></input>
                      <label class="form-check-label" for="noDrugs">noDrugs</label>
                    </div>
                    <div class="form-check custom-control">
                      <input type="checkbox" class="form-check-input" id="noPets" name="noPets" checked={this.noPets} onChange={this.handleInputChangeroomaterules} ></input>
                      <label class="form-check-label" for="noPets">noPets</label>
                    </div>
                  </div>
                  <br></br>
                  {/* All the host Information is mandatory name,phone no and univeristy and this is only for students */}
                  <div id="hostInfo">
                    <h4>HostInformation</h4>
                    <div class="form-group"><b>Name:</b>
                      <input class="form-control" type="text" id="name" name="name" onChange={this.handleInputChangehostInfo}></input>
                      <div className="required">
                        {this.state.nameError}
                      </div>
                    </div>
                    <div class="form-group"><b>PhoneNo</b>
                      <input class="form-control" type="number" id="phoneno" name="phone"
                        pattern="^\d{4}-\d{3}-\d{4}$"
                        onChange={this.handleInputChangehostInfo}></input>
                      <div className="required">
                        {this.state.phoneError}
                      </div>
                    </div>

                    <br></br>
                    <div class="form-group"><b>University</b>
                      <input class="form-control" type="text" id="university" name="university" onChange={this.handleInputChangehostInfo}></input>
                      <div className="required">
                        {this.state.universityError}
                      </div>
                    </div>
                    <div><b>Gender</b>
                      <div class="form-check custom-control">
                        <input type="radio" class="form-check-input" id="Male" name="gender" value="male" onChange={this.handleInputChangehostInfo} ></input>
                        <label class="form-check-label" for="Male">Male</label>
                      </div>
                      <div class="form-check custom-control">
                        <input type="radio" class="form-check-input" id="Female" name="gender" value="female" onChange={this.handleInputChangehostInfo}></input>
                        <label class="form-check-label" for="Female">Female</label>
                      </div>
                      <div className="required">
                        {this.state.genderError}
                      </div>
                    </div>
                  </div>
                  <br></br>
                  <div><b>Upload Room Image</b>
                    <FileBase
                      type="file"
                      multiple={false}
                      onDone={({ base64 }) => this.handleImageChange(base64)}
                    />
                  </div>
                  <br></br>
                  {/* button to submit and the form is created */}
                  <div className="form-button">
                    <button name="button" id="createroom" className="form-submit" value="CreateRoom" onClick={this.handleSubmit}>CreateRoom</button>
                  </div>
                  <br></br>
                </div>
              </form>
            </div>
          </div>
        </div>
        <FooterComponent />
      </div>
    )
  }
}
//Defining PropTypes
Roomlistings.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  createListing: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
// Allows us to get our state from redux and map it to props 
// and can be used inside our component
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { createListing, logoutUser }
)(withRouter(Roomlistings));