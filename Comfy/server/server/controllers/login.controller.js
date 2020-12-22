/**
 * importing module dependencies 
 */
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import keys from "../config/keys";

import validateLoginInput from "../validator/login";

// Logic for user login
const login = (req, res, next) => {

  //Form validation

  const {
    errors,
    isValid
  } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  var email = req.body.email;
  var password = req.body.password;

  // Find user by email
  User.findOne({
    email
  }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({
        emailnotfound: "Email not found"
      });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey, {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({
            passwordincorrect: "Password incorrect"
          });
      }
    });
  });
};

export default {
  login: login
}