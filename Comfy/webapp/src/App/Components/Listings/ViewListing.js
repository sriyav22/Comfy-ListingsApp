import React from 'react';
import FooterComponent from '../Footer/footer';
import './Listing.css';

class ViewListing extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div class="container">

                <h4>Room Details</h4>
                <div class="row row-spacing">
                    <div class="col">
                        <p><b>Lease term</b></p>
                        <p>{this.props.listing.Leasingterm}</p>
                    </div>
                    <div class="col">
                        <p><b>Room Type</b></p>
                        <p>{this.props.listing.roomType}</p>
                    </div>
                    <div class="col">
                        <p><b>Bedrooms</b></p>
                        <p>{this.props.listing.totalNoOfBedrooms}</p>
                    </div>
                    <div class="col">
                        <p><b>Bathrooms</b></p>
                        <p>{this.props.listing.totalNoOfBathrooms}</p>
                    </div>
                </div>
                <div class="row row-spacing">
                    <div class="col">
                        <p><b>Roommate Description</b></p>
                        <p>{this.props.listing.roommateDescription}</p>
                    </div>
                    <div class="col">
                        <p><b>About Neighborhood</b></p>
                        <p>{this.props.listing.AboutNeighborhood}</p>
                    </div>
                </div>
                <div class="row row-spacing">
                    <div class="col">
                        <p><b>Amenities</b></p>
            inUnitWasher : {this.props.listing.Amenities.inUnitWasher ? 'Yes' : 'No'}
                        <br></br>
            AC : {this.props.listing.Amenities.AC ? 'Yes' : 'No'}
                        <br></br>
            TV : {this.props.listing.Amenities.TV ? 'Yes' : 'No'}
                        <br></br>
            Wi-fi :{this.props.listing.Amenities.wifiIncluded ? 'Yes' : 'No'}
                        <br></br>
            Private Bathroom:{this.props.listing.Amenities.privateBathroom ? 'Yes' : 'No'}

                    </div>
                    <div class="col">
                        <p><b>Roommate Rules</b></p>
                        <p>Drinking Allowed ? {this.props.listing.roommateRules.noDrinking ? 'No' : 'Yes'}</p>
                        <p>Smoking Allowed ? {this.props.listing.roommateRules.noSmoking ? 'No' : 'Yes'}</p>
                        <p>Pets ? {this.props.listing.roommateRules.noPets ? 'Not Allowed' : 'Pet Friendly'}</p>
                        <p>Drugs ? {this.props.listing.roommateRules.noDrugs ? 'Not Allowed' : 'Allowed'}</p>
                    </div>
                </div>
                <div class="row row-spacing">
                    <div class="col">
                        <p><b>Roommate Preferences</b></p>
                        <p>Gender : {this.props.listing.preferredGender}</p>
                        <p>Age : {this.props.listing.preferredAge}</p>
                    </div>
                    <div class="col">
                        <p><b>Host Information</b></p>
                        <p>{this.props.listing.hostInformation.name}</p>

                        <p>{this.props.listing.hostInformation.phone}</p>
                    </div>
                </div>


                <div class="row">
                    <div class="col">
                        <p><strong>Address</strong></p>
                        <p>{this.props.listing.address.addressLine1} , {this.props.listing.address.addressLine2}</p>
                        <p>{this.props.listing.address.city}</p>
                        <p>{this.props.listing.address.state}</p>
                        <p>{this.props.listing.address.zipCode}</p>


                    </div>
                </div>

            </div>


        )
}

}

export default ViewListing;


