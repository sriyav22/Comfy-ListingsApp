/**
 * Importing dependencies
 */
import express from 'express';
import listingController from '../controllers/listing.controller';

// Creating a router for listings
const listingRouter = express.Router();

/**
 * Search - GET /listings
 * Create - POST /listings
 */
listingRouter.route('/')
    .get(listingController.getListings)

listingRouter.route('/')
    .post(listingController.createListing);

/**
 * Retrieve - GET /listings/${id}
 * Update - PUT /listings/${id}
 * Delete - DELETE/listings/${id}
 */
listingRouter.route('/:id')
    .delete(listingController.deleteListing)
    .get(listingController.getListing)
    .put(listingController.updateListing);


export default listingRouter;