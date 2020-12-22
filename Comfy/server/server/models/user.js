/**
 * Importing dependencies
 */
import mongoose from 'mongoose';

/**
 * Mongoose schema for user object.
 */
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: [/\S+@\S+\.\S+/, 'is invalid']
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: 'User'
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false
});

// Creating the user model from the schema 
const model = mongoose.model('user', UserSchema);
export default model;