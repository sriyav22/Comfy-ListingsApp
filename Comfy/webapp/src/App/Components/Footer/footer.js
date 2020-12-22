import React from "react";
import '../Homepage/homepage.css';

// Code in the page is used as footer across all web pages 

class FooterComponent extends React.Component {

    render() {
        return(
            <div> 
                    <footer class="page-footer font-small colorbg pt-4 mt-4">

                        <div>
                            <div class="container">

                            <div class="row py-4 d-flex align-items-center">

                            </div>

                            </div>
                        </div>

                        {/* Different Parts of Footer  */}
                        <div class="container text-center text-md-left mt-5">

                            <div class="row mt-3 dark-grey-text">

                            <div class="col-md-3 col-lg-4 col-xl-3 mb-4">

                                <h6 class="text-uppercase font-weight-bold">COMFY</h6>
                                {/* <hr class="teal accent-3 mb-4 mt-0 d-inline-block mx-auto" style="width: 60px;" /> */}
                                <p>We offer you ways to not only get a suitable accomodation but also help you in renting out one with great ease.</p>

                            </div>

                            <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">

                                <h6 class="text-uppercase font-weight-bold">Features</h6>
                                {/* <hr class="teal accent-3 mb-4 mt-0 d-inline-block mx-auto" style="width: 60px;" /> */}
                                <p>
                                Rent out Rooms
                                </p>
                                <p>
                                Find Accomodations
                                </p>
                                <p>
                                In All Major Cities 
                                </p>

                            </div>

                            {/* Useful links  */}

                            <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">

                                <h6 class="text-uppercase font-weight-bold">Useful links</h6>
                                <p>
                                <a class="dark-grey-text" href="/favorites/">Your Favorites</a>
                                </p>
                                <p>
                                <a class="dark-grey-text" href="/MyListings/:id">My created listings</a>
                                </p>
                                <p>
                                <a class="dark-grey-text" href="/ViewRoom/">Browse Postings</a>
                                </p>


                            </div>

                            {/* Contact Information  */}

                            <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">

                                <h6 class="text-uppercase font-weight-bold">Contact</h6>
                                {/* <hr class="teal accent-3 mb-4 mt-0 d-inline-block mx-auto" style="width: 60px;" /> */}
                                <p>
                                <i class="fas fa-home mr-3"></i> New York, NY 10012, US</p>
                                <p>
                                <i class="fas fa-envelope mr-3"></i> comfy@comfy.com</p>
                                <p>
                                <i class="fas fa-phone mr-3"></i> + 01 234 567 88</p>
                                <p>
                                <i class="fas fa-print mr-3"></i> + 01 234 567 89</p>

                            </div>
                            </div>


                        </div>

                        {/* Copyright  */}

                        <div class="footer-copyright text-center text-black-50 py-3">© 2020 Copyright:
                            <a class="dark-grey-text" href="/"> Comfy.com</a>
                        </div>


                        </footer>
               </div>
            
        )
    }
}

    export default (FooterComponent);