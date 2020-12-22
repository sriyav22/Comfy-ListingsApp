/**
 * import module dependencies 
 */
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import model from './models';
import routes from './routes';
import listing from './models/listing';
import cors from 'cors';


// mongoose instance url connection to the db
mongoose.connect('mongodb+srv://adminuser:admin12345@cluster0.e7txc.mongodb.net/room-listings?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

// Initializing express application
const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
   //res.header("Access-Control-Allow-Headers", true);
    next();
  });   


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

routes(app);

export default app;