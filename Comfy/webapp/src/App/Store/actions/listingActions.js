import axios from 'axios';

import { 
    CREATE_LISTING, 
    GET_ERRORS,
    LISTING_LOADING,
    FETCH_LISTINGS 
}   from './types';


// Action creators
// Fetch all room listings
export const fetchListings = () => (dispatch) => {
  axios
    .get("http://localhost:5000/listings/")
    .then(res => {
      dispatch({type:'FETCH_LISTINGS', payload:res.data})
    })
 // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: ((err||{}).response||{}).data || 'Error unexpected'
      })
    );
}; 

  // Loading listings
  export const setListingLoading = () => {
    return {
      type: LISTING_LOADING
    };
  };

  // Create a new room listing 

  export const createListing = (listingData) => dispatch => {
    axios
      .post("http://localhost:5000/listings/", listingData)
      .then(res => {
        dispatch(CREATE_LISTING(listingData));
        //history.push('/ViewRoom')
      })
   // re-direct to login on successful register
      .catch(err =>{
        dispatch({
          type: GET_ERRORS,
          payload: ((err||{}).response||{}).data || 'Error unexpected'
          
        })
      });
  };



