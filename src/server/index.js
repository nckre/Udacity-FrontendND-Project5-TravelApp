var path = require('path')
const express = require('express') // Require Express to run server and routes
const bodyParser = require('body-parser') // Middleware
const cors = require('cors') // Cross-origin allowance
const fetch = require('node-fetch'); // Node JS Fetch

// Use dotenv to process API key from .env file 
const dotenv = require('dotenv');
dotenv.config();

// Setup empty JS object to act as endpoint for all routes
const tripData = [];

// Start up an instance of app
const app = express();

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

const port = 3000;
// Setup Server
const server = app.listen(port, listening);
function listening() {
    console.log(`running on localhost: ${port}`);
};

// Respond with Project Data when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
})

app.get('/trips', getTrips)
function getTrips(req,res){
  console.log(tripData);
  res.send(tripData)
}


app.post('/addTrip', cors(), addTrip);

// Add weather entry with POST request 
function addTrip(req,res){
  newEntry = {
    city: req.body.goto,
    start_date: req.body.start,
    end_date: req.body.end,
    duration: req.body.duration,
    temperature: req.body.temp,
    preview: req.body.pic
}
  tripData.push(newEntry);
  res.send(tripData);
}