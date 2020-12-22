/**
 * Importing dependencies
 */
import express from 'express';
import authController from '../controllers/authentication.controller';
import loginController from '../controllers/login.controller';
const router = express.Router();


/* GET users  */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/**
 * Create user - POST /users/register
 * Login user - POST  /login
 */
router.route('/users/register')
  .post(authController.register);

router.route('/login')
  .post(loginController.login)

export default router;