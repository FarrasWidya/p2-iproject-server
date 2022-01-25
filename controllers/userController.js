const {User} = require('../models');
const {compareHash} = require('../helpers/bcrypt');
const {createJWT} = require('../helpers/jwt');

class userController{
  static async register(req, res, next) {
    try {
      const { email, password, username, avatar, gender, bio } = req.body
      const registerForm = { email, password, username, avatar, gender, bio }

      const newUser = await User.create(registerForm)
      res.status(201).json({
        id: newUser.id,
        username: newUser.username
      })

    } catch (err) {
      next(err)
    }
  }
}

module.exports = userController
