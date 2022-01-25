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

  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      if (!email) {
        throw ({ name: 'noemail' })
      }
      if (!password) {
        throw ({ name: 'nopassword' })
      }
      const findUser = await User.findOne({
        email: email
      })

      if (!findUser) {
        throw ({ name: 'NotFound' })
      }
      if (!compareHash(password, findUser.password)) {
        throw ({ name: 'NotFound' })
      }

      const payload = {
        id: findUser.id,
        email: findUser.email,
        username:findUser.username
      }
     

      const token = createJWT(payload)

      res.status(200).json({
        access_token: token,
         dataId : payload.id ,
         dataUsername:payload.username
      })

    } catch (err) {
      next(err)
    }
  }
}

module.exports = userController
