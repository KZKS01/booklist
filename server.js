//Dependencies
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override")
const booksRouter = require('./controllers/books');

//initialize the application
const app = express();

//configure settings
//use require() function to import "dotenv" pkage, a zero-dependency module that loads environment vars from a .env file. 
//The config() method is then called on the imported package to configure the environment variables.
require("dotenv").config(); //looks for a .env file and makes it's vars available to process
//use the process.env object to access the environment vars that have been set in the .env file. 
//process.env.PORT and process.env.DATABASE_URL are being assigned to the PORT and DATABASE_URL variables respectively.
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

//establish connection to mongodb
mongoose.set('strictQuery', false);
mongoose.connect(DATABASE_URL);
//Database Connection Error/Success
//Define callback functions for various events
const db = mongoose.connection;
db.on("error", (err) => console.log(err.message + " is mongo not running?")); //"error" is the name of the event
db.on("connected", () => console.log("mongo connected"));

//mount middleware
//body parser middleware: give us access to req.body
app.use(express.urlencoded({extended: false}));//req.body allows to access form data
app.use(methodOverride("_method"));

//mount routes
app.use(booksRouter);

//Listener
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));
