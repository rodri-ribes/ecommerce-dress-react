const express = require("express")
const { urlencoded } = require("express");
const morgan = require("morgan")
const routes = require("./routes/index.js")

require('./database/db.js');

const cors = require("cors")

require('dotenv').config();

const server = express();

server.use(urlencoded({ extended: false }))
server.use(morgan('dev'));
server.use(express.json());

const corsOptions = {
    origin: 'https://ecommerce-react-client-jade.vercel.app',
    credentials: true,
    methods: 'GET, POST, OPTIONS, PUT, DELETE',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  };
  
server.use(cors(corsOptions));


server.use('/', routes);



module.exports = server
