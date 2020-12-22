import React from "react";
import NavbarComponent from '../Navbar/navbar'
import FooterComponent from '../Footer/footer'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../Store/actions/authActions";

import './homepage.css';

// Home Page for  the webapp

class MainComponent extends React.Component {

    //Assigning state to searchedValue
    state = { 
        searchedValue: '' 
    };
    onSearch = (event) => {
        this.setState({ searchedValue: event.target.value });
    }

    //if the user is not logged in and attempts to search by city, an alert popup is thrown
    // Alert showing to login or SignUp
    onBrowseClick = e => {
        {JSON.stringify(this.props.auth.user) === '{}'?
        alert('Please LOGIN or SIGNUP!'):this.handleClick();
      }};


    // To Navigate across
      handleClick = () => {
        this.props.history.push(`/ViewRoom/${this.state.searchedValue}`);
        console.log(this.props.auth.user);
    }
   
    render() {
        return(

            <div>   
          
                {/* The navbar component is called */}
                <NavbarComponent history={this.props.history}/>

                {/* The initial section where there is an image and some text. used bootstrap for styling */}
                <img src ="https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2019/8/1/1/uo2019_living-room-01-wide-blinds-up-KB2A8968_h.jpg.rend.hgtvcom.966.644.suffix/1564684055231.jpeg" class=" mx-auto d-block mt-5 pt-5 main-homepage-img" />
                <h3 class = "mt-5 text-center">Rent rooms and find roommates </h3>
                <h3 class = "text-center">in our verified community.</h3>

                {/* The form tag is defined here so that the search box along with an input can be implemented and on click
                of SEARCH BY CITY button, onSearch function is called*/}
                <form class="form-inline my-2 mt-5 justify-content-center">
                    <input className="form-control mr-lg-2" type="search" placeholder="Select City" onChange={this.onSearch} value={this.state.searchedValue}  aria-label="Search" />
                    <button className="btn btn-outline-dark btn-light my-2 my-lg-0" type="submit" onClick={() => {
                        this.onBrowseClick() 
                    }}>SEARCH BY CITY</button>
                </form>

                {/* Rooms for rent section where the image and text are aligned in grid format with one row and 2 columns */}
                <div class = "container ">
                    <div class = "row pt-5">
                        <div class = "col-lg-8">
                            <img src ="https://images.pexels.com/photos/2422277/pexels-photo-2422277.jpeg?cs=srgb&dl=pexels-jopwell-2422277.jpg&fm=jpg" class="rounded homepage-img"  />
                        </div>
                        <div className = "col-lg-4">
                            <h3 className = "pt-3"> Rent Your Way</h3>
                            <p className = "pt-2">It is your place. Rent it how you want.</p>
                            <h5 className = "mt-4 pt-4 homepagearticle1">A ROOMMATE FOR EVERYONE</h5>
                            <p>Use if you’re looking for a new BFF to live with or just need someone to move in and split rent.</p>
                            <h5 className = "mt-4 pt-4 homepagearticle1">FLEXIBLE RENTING TERMS</h5>
                            <p>Find someone to rent an empty room – whether it’s for 3 months or a whole year!</p>
                        </div>
                    </div>   
                </div>


                {/* The section where the image and text are aligned in grid format with one row and 2 columns */}
                <div class = "container">
                    <div class = "row pt-5">
                        <div class = "col-lg-8 text-center">
                            <img src ="https://foundationpsychology.com.au/wp-content/uploads/2016/03/Book-online.jpe" class="rounded online-img"  />
                        </div>

                        <div className = "col-lg-4">
                            <h3 className = "pt-3"> Rent Easier</h3>
                            <p className = "pt-2">Makes the entire roommate finding experience simple – everything is verified and documented.</p>
                            <h5 className = "mt-4 pt-2 homepagearticle2">ONLINE BOOKING</h5>
                            <p>Easily review booking requests from interested renters. Once you approve their request to book your room, we’ll take your listing off the market and set up secure payment.</p>
                            <h5 className = "mt-4 pt-2 homepagearticle2">SECURE PAYMENTS</h5>
                            <p>When potential roommates book your room, Roomi will hold and safely transfer the 1st month rent payment for you (no sketchy cash offline payments).</p>
                        </div>

                    </div>
                </div>
                


                {/* Section implemented with grid layout to show the user experience content in boxes, Used some bootstrap css for 
                better visual appeal and icons as well. */}

                <div className = "container mb-5">
                    <div className = "row pt-5">
                        <div className = "col-lg-6 ">
                            <div className = "bubble">
                            <i className="fas fa-quote-left pr-3"></i>
                            <span className="font-italic">Comfy is a quick and easy way to find a trustworthy roommate compared to other outlets. Nice to have an app that emphasizes security and provides quality service.</span>
                            <i className="fa fa-quote-right pl-3" aria-hidden="true"></i><br />

                            <div className="row">
                                <div className="col-sm-7"></div><br /><br /> <br />
                                <div className="col-sm-5 text-center mt-4"><h5 >Elena</h5>
                             <h6 >FOUND A ROOM</h6></div>
                            </div>
                            </div>
                        </div>

                        <div className = "col-lg-6 ">
                            <div className = "bubble">
                            <i className="fas fa-quote-left pr-3"></i>
                            <span className="font-italic">Put my room on Comfy and found multiple cool peeps interested in my apartment. Best of all, they had profiles I could easily vet before showing the room. Couldn't be happier with my new roommate and Comfy's customer service.</span>
                            <i className="fa fa-quote-right pl-3" aria-hidden="true"></i><br />

                            <div className="row">
                                <div className="col-sm-7"></div><br /> <br /><br /> 
                                <div className="col-sm-5 text-center mt-4"><h5 >Alex</h5>
                             <h6 >FILLED A ROOM</h6></div>
                            </div>
                            </div>
                        </div>
                    </div>    

                </div>


                {/* Calling Footer Component  */}
                <FooterComponent/>

            </div>
            
        );
    }
}

            //Defining propTypes
            MainComponent.propTypes = {
                logoutUser: PropTypes.func.isRequired,
                auth: PropTypes.object.isRequired
            };

            //mapStateToProps allows us to get our state from Redux and map it to props which we can use inside components
            const mapStateToProps = state => ({
                auth: state.auth
            });

            //export function to export the props, logoutUser function along with the component.
            export default connect(
                mapStateToProps,
                { logoutUser }
            )(MainComponent);