const express = require('express')
const userRouter = require('./routes/user')
const cors = require('cors')
require('./db/mongoose')

const app = express()
const port = process.env.PORT

const corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));


app.use(express.json())
app.use(userRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
