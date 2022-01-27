
const { Content, User } = require('../models')


const authorization = async (req, res, next) => {
  
  try {
    const findContent = await Content.findByPk(req.params.contentId)
    const findUser = await User.findByPk(req.currentUser.id)


    if (!findContent) {
      throw ({name:'notfound'})
    }

   if (findContent.UserId === findUser.id) {
      next()
    } else {
      throw ({ name: 'unauth' })
    }


  } catch (err) {
    console.err
    next(err)
  }

}

module.exports = authorization