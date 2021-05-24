require("dotenv").config();

const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
const cors = require("cors")
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Init Restaurant Routes
app.use("/",routes);

//Error Handler
app.use(function (err,req,res,next){
    console.error(err.stack)
    res.status(500).send('Something broke!');
})


const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));

