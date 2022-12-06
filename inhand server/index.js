const { response } = require('express');
const express = require('express')
const { model } = require('mongoose');


const dataservice = require('./services/data.service')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const app = express()

app.use(cors({
    origin: 'http://localhost:4200'

}))

// parse data from json to javscript form


app.listen(3000, () => {
    console.log('server started at port 3000');
})
// Application specific  Middleware  
const appMiddleware = (req, res, next) => {
    console.log("Application specific  Middleware  ");
    next()
}
//   to use in entire application
app.use(appMiddleware)

app.use(express.json())


// jwt token verification middleware
const jwtMiddleware = (req, res, next) => {
    console.log('router specific middlewrae');
    // 1. get token from request header in access token
    const token = req.headers['access-token']
    // 2. verify token using 'verify()' method in jsonwebtoken
    try {
        const data = jwt.verify(token, "secretkey12345")
        // assinging login user acno to currentacno
        req.currentName = data.currentName
        console.log(data);
        next()
    }
    catch {
        res.status(422).json({
            status: false,
            massage: 'Please login'
        })
    }
}

//   login

app.post('/login', (req, res) => {
     console.log(req.body);

    // asynchronous
    dataservice.login(req.body.username, req.body.password)
        .then((result) => {
            res.status(result.statusCode).json(result)
            console.log(result);
        })
})
// register page

app.post('/register',(req,res)=>{
    dataservice.register(req.body.username,req.body.name,req.body.email,req.body.password)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

// getproducts
app.get('/productsAll', (req, res) => {
    // console.log(req.body);

    dataservice.getProducts()
        .then((result) => {
            res.status(result.statuscode).json(result)
        })
})