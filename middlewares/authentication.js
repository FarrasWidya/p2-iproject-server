const { verifyJWT } = require('../helpers/jwt')
const { User } = require('../models')
const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers
    if (!access_token) {
      throw ({ name: 'notFound' })
    }
    const verifyPayload = verifyJWT(access_token)

    const findId = await User.findByPk(verifyPayload.id)
    if (!findId) {
      throw ({ name: 'notFound' })
    } else {
      req.currentUser = {
        id: findId.id,
      }
      next()
    }
  } catch (err) {
    next(err)
  }
}

module.exports = authentication