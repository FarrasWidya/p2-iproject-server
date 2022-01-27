if (process.env.NODE_ENV !== "production") {
require("dotenv").config();
}
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const index = require('./routes')
const cors = require('cors');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', index)


app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`)
})
