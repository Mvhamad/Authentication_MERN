const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const Routes = require('./routes/routes')

// database
require('dotenv').config({path: './config/.env'});
require('./config/db');
//app
const app = express();

//
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//routes
app.use('/api', Routes)

//listening
const Port = process.env.PORT || 5555;
app.listen(Port, () => {
  console.log(`my server is running on port ${Port}`);
});
