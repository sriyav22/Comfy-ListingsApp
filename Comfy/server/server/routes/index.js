
/**
 * Importing dependencies
 */
import express from 'express';
import authRouter from '../routes/authentication';
import listingRouter from '../routes/listing';

export default (app) => {
  app.use('/', authRouter);
  app.use('/listings', listingRouter);
};