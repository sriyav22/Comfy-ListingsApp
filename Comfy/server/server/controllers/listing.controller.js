/**
 * importing module dependencies from services and model
 */
import listingService from '../services/listing.service';
import listings from '../models/listing';

/**
 * Sets response for room listing search.
 *
 * @param req
 * @param res
 */
const getListings = (req, res) => {
    listings.find({})
        .then(function (listings) {
            res.json(listings);
        })
        .catch(function (err) {
            res.json(err);
        })
};
/**
 * Returns listing object as response by id.
 *
 * @param req
 * @param res
 */
const getListing = (req, res) => {
    const listingId = req.params.id;
    const result = (listing) => {
        res.status(200);
        res.json(listing);
    };
    const promise = listingService.getListing(listingId);
    promise
        .then(result)
        .catch(handleErrorResponse(res));
};

/**
 * Updates the listing resource.
 *
 * @param req
 * @param resp
 */
const updateListing = (req, res) => {
    const listingId = req.params.id;
    const updatedListing = Object.assign({}, req.body);

    updatedListing.id = listingId;
    const result = (listing) => {
        res.status(200);
        res.json(listing);
    };
    const promise = listingService.updateListing(updatedListing);
    promise
        .then(result)
        .catch(handleErrorResponse(res));
};


/**
 * Adding a new room listing
 * @param req
 * @param res
 */

const createListing = (req, res) => {
    const listing = Object.assign({}, req.body);
    const result = (savedListing) => {
        res.status(201);
        res.json(savedListing);
    };
    const promise = listingService.createListing(listing);
    promise
        .then(result)
        .catch(handleErrorResponse(res));
};

/**
 * Deletes a listing resource.
 *
 * @param req
 * @param res
 */
const deleteListing = (req, res) => {
    const listingId = req.params.id;
    const result = () => {
        res.status(200);
        res.json({
            message: "Successfully Deleted."
        });
    };
    const promise = listingService.deleteListing(listingId);
    promise
        .then(result)
        .catch(handleErrorResponse(res));
};
/**
 * Throws error if error todo item is present.
 *
 * @param {Response} res The response object
 * @return {Function} The error handler function.
 */
let handleErrorResponse = (res) => {
    const errorCallback = (error) => {
        if (error) {
            res.status(500);
            res.json({
                message: error.message
            });
        }
    };
    return errorCallback;
};

export default {
    createListing: createListing,
    deleteListing: deleteListing,
    getListings: getListings,
    updateListing: updateListing,
    getListing: getListing
}