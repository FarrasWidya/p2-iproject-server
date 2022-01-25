const express = require('express')
const index = express.Router()

const {userController} = require('../controllers/userController');
const {contentController} = require('../controllers/contentController'); 

//User Handler
index.post('/register',userController)
index.post('/login',userController)

//Content Handler

//get all content
index.get('/content',contentController)
//post new content
index.post('/content',contentController)
//get content by id
index.get('/content/:contentId',contentController)
// post comment on content
index.post('/content/:contentId/comments')
//get profile by id
index.get('profile/:profileId',contentController)//jadi atau ngga ?
// patch upvote params up or down
index.patch('content/:id',contentController)
index.delete('content/:id',contentController)

module.exports = index