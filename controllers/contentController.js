const { Content, Comment, Tag, User, Vote } = require('../models');
const { verifyJWT } = require('../helpers/jwt');
const axios = require('axios');

class contentController {

  static async getAllData(req, res, next) {

    const { TagId } = req.query

    const query = {
      include: [{
        model: Tag,
        attributes: {
          exclude: ['id', 'createdAt', 'updatedAt']
        }
      }, {
        model: User,
        attributes: {
          exclude: ['id', 'password', 'gender', 'bio', 'avatar', 'createdAt', 'updatedAt']
        }
      }],
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      where: {},
      order:[['id','DESC']]
    }

    if (+TagId === 1) {
      query.where.TagId = 1
    } else if (+TagId === 2) {
      query.where.TagId = 2
    } else if (+TagId === 3) {
      query.where.TagId = 3
    } else if (+TagId === 4) {
      query.where.TagId = 4
    } else if (+TagId === 5) {
      query.where.TagId = 5
    }

    try {
      const allData = await Content.findAll(query)
      res.status(200).json(allData)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  // static async postNewContent(req, res, next) {
  //   try {

  //     const { title, content, TagId } = req.body

  //     const newData = await Content.create({
  //       UserId: req.currentUser.id,
  //       title: title,
  //       content: content,
  //       TagId: TagId
  //     })

  //     res.status(201).json({ message: 'Content has been created !' })


  //   } catch (err) {
  //     next(err)
  //   }
  // }
  //belom di push
  static async getDataById(req, res, next) {
    try {
      const { contentId } = req.params

      const data = await Content.findByPk(contentId, {
        include: [{
          model: Comment,
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }, include: {
            model: User,
            attributes: ['username']
          }
        }, {
          model: Tag,
          attributes: {
            exclude: ['id', 'createdAt', 'updatedAt']
          }
        }, {
          model: User,
          attributes: {
            exclude: ['id', 'password', 'gender', 'bio', 'avatar', 'createdAt', 'updatedAt']
          }
        }],
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      })

      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }
  static async getCommentById(req, res, next) {
    try {
      const { contentId } = req.params

      const data = await Comment.findAll({
        where: {
          ContentId: contentId
        }, include: {
          model: User,
          attributes: {
            exclude: ['id', 'password', 'gender', 'bio', 'createdAt', 'updatedAt']
          }
        }
      })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }
  static async postComment(req, res, next) {
    try {
      const { message } = req.body

      const newComment = await Comment.create({

        message: message,
        UserId: req.currentUser.id,
        ContentId: req.params.contentId
      })

      res.status(201).json({ message: 'comment has been created !' })
    } catch (err) {

      next(err)
    }
  }

  static async postVote(req, res, next) {
    try {
      const { contentId } = req.params


      const findVote = await Vote.findOne({
        where: {
          ContentId: contentId,
          UserId: req.currentUser.id
        }
      })


      if (findVote) {

        throw { name: 'alreadyVoted' }
      }

      await Vote.create({
        ContentId: contentId,
        UserId: req.currentUser.id
      })
      await Content.increment('upvote', { where: { id: contentId } });


      res.status(201).json({ message: `You have upvoted content with id ${contentId}` })
    } catch (err) {
      next(err)
    }
  }

  static async getVote(req, res, next) {
    try {

      const totalVote = await Vote.findAll({
        where: {
          UserId: req.currentUser.id
        }, attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      })

      res.status(200).json(totalVote)

    } catch (err) {
      next(err)
    }
  }

  static async deleteContent(req, res, next) {
    try {
      const { contentId } = req.params

      const deleteContent = await Content.destroy({
        where: {
          id: +contentId
        }
      })

      res.status(200).json({ message: 'content has been deleted' })
    } catch (err) {
      next(err)
    }
  }

  static async postMeme(req, res, next) {
    try {
      const { addTag, addTitle, bottomText, topText, inputMeme } = req.query
   
    
      let data = {
        "template_id": inputMeme,
        "username": process.env.APIusername,
        "password": process.env.password,
        "font": "arial",
        "text0": topText,
        "text1": bottomText,
      }

      const response = await axios({
        method: 'post',
        url: `https://api.imgflip.com/caption_image`,
        params: data
      })

      if (response) {
        const newMeme = await Content.create({
          title: addTitle,
          TagId: addTag,
          content: response.data.data.url,
          UserId : req.currentUser.id
        })
      }

      res.status(201).json({ message: 'new meme has been created !' })

    } catch (err) {

      next(err)
    }
  }

  static async getTimezone(req,res,next){
    try {

    const response = await axios.get(`https://timezone.abstractapi.com/v1/current_time/?api_key=${process.env.APIKEYTIMEZONE}&location=Jakarta, Indonesia`)

    res.status(200).json(response.data)
      
    } catch (err) {
      next(err)
    }
  }
}

module.exports = contentController
