/**
 * importing module dependencies
 */
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authService from '../services/authentication.service';

// Encrypting the password during registration
/**
 * Create user.
 *
 * @param req
 * @param res
 */

import validateRegisterInput from "../validator/register";

// Adding the register logic to create the user 
const register = (req, res, next) => {

    //Form validation

    const {
        errors,
        isValid
    } = validateRegisterInput(req.body);

    //Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            return res.status(400).json({
                email: "Email already exists"
            });
        } else {
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });
            //Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                })
            })


        }
    })
};

/**
 * Throws error if error user is present.
 *
 * @param {Response} response The response object
 * @return {Function} The error handler function.
 */
let handleErrorResponse = (response) => {
    const errorCallback = (error) => {
        if (error) {
            response.status(500);
            response.json({
                message: error.message
            });
        }
    };
    return errorCallback;
};
export default {
    register: register
}