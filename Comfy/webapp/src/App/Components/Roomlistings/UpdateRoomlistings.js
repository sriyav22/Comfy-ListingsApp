import React, { Component } from 'react';
import { connect } from "react-redux";
import {createListing} from '../../Store/actions/listingActions';
import { logoutUser } from "../../Store/actions/authActions";
import PropTypes from "prop-types";
import {withRouter} from 'react-router-dom';
import NavbarComponent from '../Navbar/navbar';
import './Roomlistings.css'
import FooterComponent from '../Footer/footer';
import Modal from '../Navbar/Modal';
import UpdateSuccessful from './UpdateSuccessful';



class UpdateRoomlistings extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
          Addnewroom :{
            address: {
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            zipCode: ""
        },
        Amenities:{
          inUnitWasher:"false",
          AC:"false",
          TV:"false",
          wifiIncluded:"false",
          privateBathroom:"false"
         
     },
     hostInformation:{
      name: "",
      phone : "",
      university:"",
      gender:""
},
roommateRules:{
  noDrinking:"false",
  noSmoking:"false",
  noDrugs:"false",
  noPets:"false"
},
            Leasingterm: "",           
            roomType: "",
            totalNoOfBedrooms:"",
            totalNoOfBathrooms:"",
            AboutNeighborhood:"",            
            preferredAge:"",
            preferredGender:"",
            roommateDescription:"",  
            selectedFile:"",
            createdBy:this.props.auth.user.id  
        }           
             }
             this.handleInputChangeAddress=this.handleInputChangeAddress.bind(this)
             this.handleInputChange = this.handleInputChange.bind(this)
             this.handleInputChangeAmenities = this.handleInputChangeAmenities.bind(this)
             this.handleInputChangeroomaterules = this.handleInputChangeroomaterules.bind(this)
             this.handleInputChangehostInfo=this.handleInputChangehostInfo.bind(this)
             this.handleImageChange=this.handleImageChange.bind(this)
            //  this.handleSubmit=this.handleSubmit.bind(this)
            }
componentDidUpdate(){
    console.log(this.props.auth)
        if(Object.keys(this.props.auth.user).length === 0){
                window.location.href = "/"
              }
          } 

          componentDidMount(){
            fetch("http://localhost:5000/listings/"+this.props.match.params.id,
            {
                headers: {
                'Content-Type': 'application/json',
                'Accept':'application/json'
                },
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({Addnewroom:data})   
                })
        }
    handleInputChangeAddress(e)
    {
      let Addnewroom ={
        ...this.state.Addnewroom,
        address:{
          ...this.state.Addnewroom.address,
          [e.target.name]: e.target.value
        }
      }
      this.setState({Addnewroom})
   }
    handleInputChangeAmenities(e){ 
      let Addnewroom ={
        ...this.state.Addnewroom,
      Amenities:{
        ...this.state.Addnewroom.Amenities,
        [e.target.name]:e.target.checked
      }
    }
      this.setState({Addnewroom})
  }

    handleInputChange(e){   
      let Addnewroom ={
          ...this.state.Addnewroom,
          [e.target.name]: e.target.value
      }
      this.setState({Addnewroom})
  }
  handleInputChangeroomaterules(e){   
    let Addnewroom ={
        ...this.state.Addnewroom,
        roommateRules:{
          ...this.state.Addnewroom.roommateRules,
          [e.target.name]: e.target.checked
        }        
    }
    this.setState({Addnewroom})
}
handleInputChangehostInfo(e){   
  let Addnewroom ={
    ...this.state.Addnewroom,

    hostInformation:{
      ...this.state.Addnewroom.hostInformation,
      [e.target.name]: e.target.value
    }      

}
this.setState({Addnewroom})
}

handleImageChange(e){
  let Addnewroom ={
    ...this.state.Addnewroom,
    selectedFile:e
}
this.setState({Addnewroom})
}

 handleSubmit = (event) => {
      event.preventDefault();
        
    //     const NewRoom = {          
                             
    //         addressLine1 : this.state.Addnewroom.address.addressLine1,
    //         addressLine2 : this.state.Addnewroom.address.addressLine2,
    //         city : this.state.Addnewroom.address.city,
    //         state: this.state.Addnewroom.address.state,
    //         zipCode:this.state.Addnewroom.address.zipCode, 

    //         inUnitWasher : this.state.Addnewroom.Amenities.inUnitWasher,
    //         AC : this.state.Addnewroom.Amenities.AC,
    //         TV : this.state.Addnewroom.Amenities.TV,
    //         wifiIncluded: this.state.Addnewroom.Amenities.wifiIncluded,
    //         privateBathroom:this.state.Addnewroom.Amenities.privateBathroom,
    //         Elevator:this.state.Addnewroom.Amenities.Elevator,
             
    //         noDrinking: this.state.Addnewroom.roommateRules.noDrinking,
    //         noSmoking:this.state.Addnewroom.roommateRules.noSmoking,
    //         noDrugs:this.state.Addnewroom.roommateRules.noDrugs,
    //         noPets:this.state.Addnewroom.roommateRules.noPets,
            
    //         name : this.state.Addnewroom.hostInformation.name,
    //         phone : this.state.Addnewroom.hostInformation.phone,
    //         university: this.state.Addnewroom.hostInformation.university,
    //         gender:this.state.Addnewroom.hostInformation.gender,

    //         Leasingterm : this.state.Addnewroom.Leasingterm,
    //         roomType : this.state.Addnewroom.roomType,
    //         totalNoofBedrooms : this.state.Addnewroom.totalNoofBedrooms,
    //         totalNoofBathrooms: this.state.Addnewroom.totalNoofBathrooms,
          
    //         AboutNeighborhood:this.state.Addnewroom.AboutNeighborhood,
    //         preferredAge : this.state.Addnewroom.preferredAge,
    //         preferredGender : this.state.Addnewroom.preferredGender,
    //         roommateDescription : this.state.Addnewroom.roommateDescription,
    //         selectedFile:this.state.Addnewroom.selectedFile
    // } 
    
    // this.props.createListing(this.state.Addnewroom);  
    
    fetch("http://localhost:5000/listings/"+this.props.match.params.id,{method:"PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.Addnewroom)
            })
        .then(respone => respone.json())
        .then(res => console.log(res.data));
        this.showModal("UpdateSuccessful"); 
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
            <Modal show={this.state.show} handleClose={this.hideModal}>
          {this.state.entry === "UpdateSuccessful" && <UpdateSuccessful user={this.props.auth.user}/>}
        </Modal>
            <NavbarComponent history={this.props.history}/>
          
          <div className="container2">
          <div className="content">
                 <div className="listingform">
                        <h2 className="roomtitle">Room Details</h2>
                        <form className="roomform" id="Room-form">
                        <div>
              <div id="location">
                        <h4>Location</h4>
                        <br></br>
                        <div className="row">    
           <div className="col">           
            <input type="text" name="addressLine1" className="form-control" id="AddressLine1" defaultValue = {this.state.Addnewroom.address.addressLine1} placeholder="AddressLine1" onChange={(e) => { console.log("ff"); this.handleInputChangeAddress(e)}}></input>
            {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
          </div>
          <div className="col"> 
            <input type="text" name="addressLine2" className="form-control" id="AddressLine2" defaultValue={this.state.Addnewroom.address.addressLine2} placeholder="AddressLine2" onChange={(e)=> this.handleInputChangeAddress(e)}></input>
          </div>
         </div>
                        <br></br>
                        <div className="row">
                        <div className="col">            
                  <input type="text" name="city" className="form-control" id="city" placeholder="City" value={this.state.Addnewroom.address.city} onChange={(e)=> this.handleInputChangeAddress(e)} required></input>
            {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                      <div className="col"> 
                     <input type="text" name="state" className="form-control" id="state" placeholder="State" value={this.state.Addnewroom.address.state} onChange={(e)=> this.handleInputChangeAddress(e)} required></input>
                     </div>
                  <div className="col"> 
                 <input type="text" name="zipCode" className="form-control" id="zipCode" placeholder="zipCode" value={this.state.Addnewroom.address.zipCode} onChange={(e)=> this.handleInputChangeAddress(e)} required></input>
                  </div>
                  </div>
             </div>
             <br></br>
             <div id="generaldetails">
                  <h4>About the Property</h4>
                    {/* <label class="my-1 mr-2" for="inlineFormCustomSelectPref">Preference</label> */}
                    <div class="layout-inline">
                                 <div><b>LeaseTerm:</b>
                                  <div class="form-check custom-control radio-width">
                                  <input type="radio" class="form-check-input" id="longTerm" name="Leasingterm" value="Long term" checked={this.state.Addnewroom.Leasingterm==="Long term"}  onChange={(e)=>this.handleInputChange(e)}></input>
                                  <label class="form-check-label" for="Leasingterm">Long</label>
                                  </div>
								  <div class="form-check custom-control radio-width">
                                  <input type="radio" class="form-check-input" id="shortTerm" name="Leasingterm" value="Short term" checked={this.state.Addnewroom.Leasingterm==="Short term"}  onChange={(e)=>this.handleInputChange(e)}></input>
                                  <label class="form-check-label" for="Leasingterm">Short</label>
                                  </div>
                                  </div>
                                  <div><b>Room type:</b>
                                  
                                  <div class="form-check custom-control radio-width">
                                  <input type="radio" class="form-check-input" id="entire" name="roomType" value="Entire" checked={this.state.Addnewroom.roomType==="Entire"}  onChange={(e)=>this.handleInputChange(e)} ></input>
                                  <label class="form-check-label" for="roomType">Entire</label>
                                  </div>
                                  <div class="form-check custom-control radio-width">
                                  <input type="radio" class="form-check-input" id="shared" name="roomType" value="Shared" checked={this.state.Addnewroom.roomType==="Shared"} onChange={(e)=>this.handleInputChange(e)} ></input>
                                  <label class="form-check-label" for="roomType">Shared</label>
                                  </div>
                                  <div class="form-check custom-control radio-width">
                                  <input type="radio" class="form-check-input" id="private" name="roomType" value="Private" checked={this.state.Addnewroom.roomType==="Private"} onChange={(e)=>this.handleInputChange(e)}></input>
                                  <label class="form-check-label" for="roomType">Private</label>
                                  </div>
                                  </div>
                                  </div>
                                   <br></br>

              <br></br>
              <div class="form-group">
                   <textarea class="form-control rounded-0" id="AboutNeighborhood" placeholder="AboutNeighborhood" name="AboutNeighborhood" value={this.state.Addnewroom.AboutNeighborhood} onChange={(e)=>this.handleInputChange(e)} rows="3"></textarea>
             </div>
                 <div class="form-group"><b>preferredAge:</b>
                        <input class="form-control" type="number" name="preferredAge" id="preferredAge" value={this.state.Addnewroom.preferredAge}  onChange={(e)=>this.handleInputChange(e)}></input>
                 </div>   
             <div><b>preferredGender:</b>
                                  <div class="form-check custom-control">
                                  <input type="radio" class="form-check-input" id="Male" name="preferredGender" value="male" checked={this.state.Addnewroom.preferredGender==="male"} onChange={(e)=>this.handleInputChange(e)} ></input>
                                  <label class="form-check-label" for="Male">Male</label>
                                  </div><div class="form-check custom-control">
                                  <input type="radio" class="form-check-input" id="Female" name="preferredGender" value="female" checked={this.state.Addnewroom.preferredGender==="female"} onChange={(e)=>this.handleInputChange(e)}></input>
                                  <label class="form-check-label" for="Female">Female</label>
                                  </div>
                                  </div>

              <br></br>
              <div className="row">  
               <div className="col">           
            <input type="number" name="totalNoOfBedrooms"  className="form-control" id="totalNoOfBedrooms" placeholder="totalNoOfBedrooms" min="0" max="20"  value={this.state.Addnewroom.totalNoOfBedrooms} onChange={(e)=>this.handleInputChange(e)}></input>
            {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
          </div>
          <div className="col"> 
            <input type="number" name="totalNoOfBathrooms" className="form-control" id="totalNoOfBathrooms" placeholder="totalNoOfBathrooms" min="1" max="20" value={this.state.Addnewroom.totalNoOfBedrooms} onChange={(e)=>this.handleInputChange(e)}></input>
          </div> 
              </div>
              <br></br>
             <div class="form-group">
              <textarea class="form-control rounded-0" id="roommateDescription" name="roommateDescription" value={this.state.Addnewroom.roommateDescription} onChange={(e)=>this.handleInputChange(e)} placeholder="roommateDescription" rows="3"></textarea>
             </div>
             </div>
             <div id="amenities">
             <h4>Amenities</h4> 
             <div class="form-check-inline custom-control align-checkbox">
                                <input type="checkbox" class="form-check-input" id="inUnitWasher" name="inUnitWasher" checked ={this.state.Addnewroom.Amenities.inUnitWasher} onChange={(e) => this.handleInputChangeAmenities(e)}></input>
                                 <label class="form-check-label " for="inUnitWasher">inUnitWasher</label>
                                </div>   
             <div class="form-check-inline custom-control align-checkbox">
                                <input type="checkbox" class="form-check-input" id="AC" name="AC" checked ={this.state.Addnewroom.Amenities.AC} onChange={(e) => this.handleInputChangeAmenities(e)}></input>
                                 <label class="form-check-label " for="AC">AC</label>
                                </div>
              <div class="form-check-inline custom-control align-checkbox">
                                <input type="checkbox" class="form-check-input" id="TV" name="TV" checked ={this.state.Addnewroom.Amenities.TV} onChange={(e) => this.handleInputChangeAmenities(e)}></input>
                                 <label class="form-check-label " for="TV">TV</label>
                                </div> 
                
            <div class="form-check-inline custom-control align-checkbox">
                                <input type="checkbox" class="form-check-input" id="wifiIncluded"   checked ={this.state.Addnewroom.Amenities.wifiIncluded} onChange={(e) => this.handleInputChangeAmenities(e)} name="wifiIncluded"></input>
                                 <label class="form-check-label " for="wifiIncluded">wifiIncluded</label>
                                </div>  
            <div class="form-check-inline custom-control align-checkbox">
                                <input type="checkbox" class="form-check-input" id="privateBathroom"  name="privateBathroom" checked ={this.state.Addnewroom.Amenities.privateBathroom} onChange={(e) => this.handleInputChangeAmenities(e)}></input>
                                 <label class="form-check-label " for="privateBathroom">privateBathroom</label>
                                </div>
                  </div>
           
             <div id="roommateRules">
             <h4>roommateRules</h4>
             <div class="form-check custom-control">
                   <input type="checkbox" class="form-check-input" id="noDrinking" name="noDrinking" checked ={this.state.Addnewroom.roommateRules.noDrinking} onChange={(e) => this.handleInputChangeroomaterules(e)}></input>
                    <label class="form-check-label" for="noDrinking">noDrinking</label>
              </div>

            <div class="form-check custom-control">
                 <input type="checkbox" class="form-check-input" id="noSmoking" name="noSmoking"  checked ={this.state.Addnewroom.roommateRules.noSmoking} onChange={(e) => this.handleInputChangeroomaterules(e)} ></input>
                 <label class="form-check-label" for="noSmoking">noSmoking</label>
              </div>
           
             <div class="form-check custom-control">
                                  <input type="checkbox" class="form-check-input" id="noDrugs" name="noDrugs" checked ={this.state.Addnewroom.roommateRules.noDrugs} onChange={(e) => this.handleInputChangeroomaterules(e)} ></input>
                                  <label class="form-check-label" for="noDrugs">noDrugs</label>
                                  </div>
            <div class="form-check custom-control">
                                  <input type="checkbox" class="form-check-input" id="noPets" name="noPets" checked ={this.state.Addnewroom.roommateRules.noPets}  onChange={(e) => this.handleInputChangeroomaterules(e)} ></input>
                                  <label class="form-check-label" for="noPets">noPets</label>
              </div>
             </div>
             <br></br>
             <div id="hostInfo">
               <h4>HostInformation</h4>
                
                      
            <div class="form-group"><b>Name:</b>
                                <input class="form-control" type="text"  id="name" name="name" value={this.state.Addnewroom.hostInformation.name} onChange={(e) => this.handleInputChangehostInfo(e)}></input>
                                 </div>
         
          
            <div class="form-group"><b>PhoneNo:</b>
                                <input class="form-control" type="number"  id="phoneno" name="phone" value={this.state.Addnewroom.hostInformation.phone} onChange={(e) => this.handleInputChangehostInfo(e)}></input>
                                 </div>
         
         </div> 
         <br></br>
  
            <div class="form-group"><b>University:</b>
                                <input class="form-control" type="text"  id="university" name="university" value={this.state.Addnewroom.hostInformation.university} onChange={(e) => this.handleInputChangehostInfo(e)}></input>
                                 </div>
             <div><b>Gender:</b>
                      <div class="form-check custom-control">
                        <input type="radio" class="form-check-input" id="Male" name="gender" value="male" checked={this.state.Addnewroom.hostInformation.gender==="male"} onChange={(e) => this.handleInputChangehostInfo(e)} ></input>
                          <label class="form-check-label" for="Male">Male</label>
                            </div>
					      <div class="form-check custom-control">
                              <input type="radio" class="form-check-input" id="Female" name="gender" value="female" checked={this.state.Addnewroom.hostInformation.gender==="female"} onChange={(e) => this.handleInputChangehostInfo(e)}></input>
                              <label class="form-check-label" for="Female">Female</label>
                              </div>
              </div>     
          </div>
          {/* <div><b>Upload Image</b>
                                    <FileBase
                                      type="file"
                                      multiple={false}
                                      onDone={({base64})=> this.handleImageChange(base64)}
                                      />
                                  </div> */}
             <div className="form-group form-button">
                <button name="signin" id="signin" className="form-submit" value="UpdateRoom" onClick={(e) => this.handleSubmit(e)}>Update Posting</button>
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

UpdateRoomlistings.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  createListing: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};



const mapStateToProps = state => ({
  
  auth: state.auth
});
export default connect(
  mapStateToProps,
  {createListing,logoutUser}
)(withRouter(UpdateRoomlistings));