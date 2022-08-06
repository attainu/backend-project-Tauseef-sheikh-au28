require('dotenv').config();
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const express = require('express');

const app = express();
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    // if(req.method === 'OPTIONS'){
    //     res.header('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH');
    //     return res.status(200).json({});
    // }
    next();
});



module.exports= app;
const PORT = process.env.PORT || 3000;