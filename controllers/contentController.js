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

  static async postNewContent(req, res, next) {
    try {


      const { title, content, TagId } = req.body

      const newData = await Content.create({
        UserId: +req.currentUser.id,
        title: title,
        content: content,
        TagId: TagId
      })

      res.status(201).json({ message: 'Content has been created !' })


    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}

module.exports = contentController
