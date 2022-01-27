const express = require('express')
const index = express.Router()

const userController = require('../controllers/userController');
const contentController = require('../controllers/contentController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');
const errorhandler = require('../middlewares/errorhandler');


index.post('/register', userController.register)
index.post('/login', userController.login)
index.get('/contents', contentController.getAllData)
index.get('/contents/:contentId',contentController.getDataById)
index.get('/contents/:contentId/comments',authentication,contentController.getCommentById)
index.post('/contents/:contentId/comments',authentication,contentController.postComment)
index.post('/contents/:contentId',authentication,contentController.postVote)
index.get('/votes',authentication,contentController.getVote)
index.delete('/contents/:contentId',authentication,authorization,contentController.deleteContent)
index.post('/memes',authentication,contentController.postMeme)
index.get('/timezones',contentController.getTimezone)
index.use(errorhandler)
module.exports = index



//kurang facebook auth