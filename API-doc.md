# MEME IT API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `GET /contents`
- `GET /contents/:contentId`
- `GET /contents/:contentId/comments`
- `POST /contents/:contentId/comments`
- `POST /contents/:contentId`
- `DELETE /contents/:contentId`
- `POST /memes`
- `GET /votes`
- `GET /timezones`

&nbsp;

## 1. POST /register

description :

- Register for new user 

Request:

- body:

```json
{
  "email": "string",
  "password": "string",
  "username" : "string",
  "avatar" : "string",
  "gender" : "string", 
  "bio" : "text" 
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "username is required"
}
OR
{
  "message": "gender is required"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

description:

- login for user

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "dataId":"integer",
  "dataEmail":"string",
  "dataUsername":"string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. GET /contents

Description:
- Get all contents from database

Request:

- query: 

```json
{
  "TagId": "integer"
}
```

_Response (200 - OK)_

```json
[
   {
        "id": 43,
        "title": "an eye for an eye",
        "content": "https://i.imgflip.com/62u931.jpg",
        "upvote": 1,
        "downvote": 0,
        "UserId": 1,
        "TagId": 5,
        "Tag": {
            "name": "Random"
        },
        "User": {
            "email": "farras@mail.com",
            "username": "Landersky"
        }
    },
    {
        "id": 42,
        "title": "hello",
        "content": "https://i.imgflip.com/62u5lr.jpg",
        "upvote": 0,
        "downvote": 0,
        "UserId": 1,
        "TagId": 5,
        "Tag": {
            "name": "Random"
        },
        "User": {
            "email": "farras@mail.com",
            "username": "Landersky"
        }
    },
  ...,
]
```
&nbsp;

## 4. GET /contents/:contentId

Description:
- Get content by their id from database

Request:

- params: 

```json
{
  "contentId": "integer"
}
```

_Response (200 - OK)_

```json
{
    "id": 43,
    "title": "an eye for an eye",
    "content": "https://i.imgflip.com/62u931.jpg",
    "upvote": 1,
    "downvote": 0,
    "UserId": 1,
    "TagId": 5,
    "Comments": [],
    "Tag": {
        "name": "Random"
    },
    "User": {
        "email": "farras@mail.com",
        "username": "Landersky"
    }
}
```
&nbsp;

## 5. GET /contents/:contentId/comments

Description:
- Get all comments by their contentid from database

Request:

- params: 

```json
{
  "contentId": "integer"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "message": "menggokils",
        "UserId": 1,
        "createdAt": "2022-01-25T17:42:54.872Z",
        "updatedAt": "2022-01-25T17:42:54.872Z",
        "ContentId": 1,
        "User": {
            "email": "farras@mail.com",
            "username": "Landersky",
            "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwTQqGv96_N5dZwGMyWrE5HfgSO1O3tSBeINP8KFG1gM0wPjSgfLR97fc3Z5UmheBkWV4&usqp=CAU"
        }
    },
    {
        "id": 2,
        "message": "qwewqeqwe",
        "UserId": 1,
        "createdAt": "2022-01-26T07:06:00.405Z",
        "updatedAt": "2022-01-26T07:06:00.405Z",
        "ContentId": 1,
        "User": {
            "email": "farras@mail.com",
            "username": "Landersky",
            "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwTQqGv96_N5dZwGMyWrE5HfgSO1O3tSBeINP8KFG1gM0wPjSgfLR97fc3Z5UmheBkWV4&usqp=CAU"
        }
    },
    ...
]
```
&nbsp;

## 6. POST /contents/:contentId/comments

Description:
- Add a comment by their contentid from database

Request:

- body: 

```json
{
  "contentId": "integer"
}
```

_Response (201 - created)_

```json
{
  "message" :"Comment has been created !"
  }
```
&nbsp;

## 7. POST /contents/:contentId

Description:
- Add an upvote by their contentid from database

Request:

- params: 

```json
{
  "contentId": "integer"
}
```

_Response (201 - created)_

```json
{
  "message" :"You have upvoted content with id <contentId>"
  }

```
  _Response (403 - forbidden)_

```json
{
  "message": "You already voted"
}

```
&nbsp;

## 8. GET /votes

Description:
- get all votes

_Response (200 - OK)_

```json
[
    {
        "id": 2,
        "UserId": 1,
        "ContentId": 1
    },
    {
        "id": 6,
        "UserId": 1,
        "ContentId": 4
    },
    ...
]

```

&nbsp;

## 9. DELETE /contents/:contentId

Description:
- delete a content by Id

Request:

- params: 

```json
{
  "contentId": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message" :"You have upvoted content with id <contentId>"
  }

```
  _Response (404 - Not Found)_

```json
{
  "message": "Id not found"
}

```
&nbsp;

## 10. POST /memes


Description:
- Add a content from 3rd party API

Request:

- query: 

```json
{
  "addTag": "integer",
  "addTitle": "string",
  "bottomText": "string",
  "topText": "string",
  "inputMeme": "string",
}
```

_Response (201 - created)_

```json
{
  "message" :"new meme has been created !"
  }

```
  _Response (400 - Bad Request)_

```json
{
  "message": "TagId is required"
}
OR
{
  "message": "Title is required"
}
OR
{
  "message": "Bottom text is required"
}
OR
{
  "message": "Top text is required"
}
OR
{
  "message": "Template is required"
}


```

## 11. GET /timezones

Description:
- Get real time from 3rd party API


_Response (200 - OK)_

```json
{
    "datetime": "2022-01-27 19:07:44",
    "timezone_name": "Western Indonesia Time",
    "timezone_location": "Asia/Jakarta",
    "timezone_abbreviation": "WIB",
    "gmt_offset": 7,
    "is_dst": false,
    "requested_location": "Jakarta, Indonesia",
    "latitude": -6.1753942,
    "longitude": 106.827183
}

```
 


&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```