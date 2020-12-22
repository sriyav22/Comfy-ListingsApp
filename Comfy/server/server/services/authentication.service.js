
/**
 * Importing dependencies - the user model
 */
import user from '../models/user';

/**
 * Saves the new todo item .
 *
 * @param new_user
*/
const create = (new_user) => {
    const newUser = new user(new_user);
    return newUser.save();
};
export default { create: create }
