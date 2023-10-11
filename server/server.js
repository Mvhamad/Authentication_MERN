const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const Routes = require('./routes/routes');

// database
require('dotenv').config({path: './config/.env'});
require('./config/db');
//app
const app = express();

//
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

//routes
app.use('/api', Routes)

//listening
const Port = process.env.PORT || 5555;
app.listen(Port, () => {
  console.log(`my server is running on port ${Port}`);
});
