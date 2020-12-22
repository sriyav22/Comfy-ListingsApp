// Import the Listing model 
import Listing from '../models/listing';

/**
 * Returns a promise for search results.
 *
 * @param search param.
 */
const getListings = (params) => {
    const promise = Listing.find(params).exec();
    return promise;
};

/**
 * Returns the room listing object by id.
 *
 * @param listingId
 */
const getListing = (listingId) => {
    const listingPromise = Listing.findById(listingId).exec();
    return listingPromise;
};
/**
 * Saves the new room listing object.
 *
 * @param new_listing
 */


const createListing = (new_listing) => {
    const newListing = new Listing(new_listing);
    return newListing.save();
};

/**
 * Updates an existing listing object.
 *
 * @param updatedListing
 */
const updateListing = (updatedListing) => {
    const promise = Listing.findByIdAndUpdate(updatedListing.id, updatedListing).exec();
    return promise;
};


/**
 * Deletes an existing listing object.
 *
 * @param listingId
 */
const deleteListing = (listingId) => {
    const promise = Listing.findByIdAndRemove(listingId).exec();
    return promise;
};


export default {
    createListing: createListing,
    getListings: getListings,
    updateListing: updateListing,
    getListing: getListing,
    deleteListing: deleteListing
}