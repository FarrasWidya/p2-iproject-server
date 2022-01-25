const { Content, Comment, tag, User } = require('../models');
const { verifyJWT } = require('../helpers/jwt');

class contentController {

  static async getAllData(req, res, next) {
    try {
      const allData = await Content.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      })
      res.status(200).json(allData)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = contentController
