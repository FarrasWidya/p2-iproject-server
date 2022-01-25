const express = require('express')
const index = express.Router()

const userController = require('../controllers/userController');
const contentController = require('../controllers/contentController'); 
const authentication = require('../middlewares/authentication');
//User Handler
index.post('/register', userController.register)
index.post('/login',userController.login)

//Content Handler

//get all content
index.get('/contents',contentController.getAllData)
//post new content
index.post('/contents',authentication,contentController.postNewContent)
//get content by id
// index.get('/content/:contentId',contentController)
// post comment on content
// index.post('/content/:contentId/comments')
//get profile by id
// index.get('profile/:profileId',contentController)//jadi atau ngga ?
// patch upvote params up or down
// index.patch('content/:id',contentController)
// index.delete('content/:id',contentController)

module.exports = index