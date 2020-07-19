// Setup empty JS object to act as endpoint for all routes
const projectData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));

const port = 3000;
// Setup Server
const server = app.listen(port, listening);
function listening() {
    console.log(`running on localhost: ${port}`);
};

// Respond with Project Data when a GET request is made to the homepage
app.get('/all', getData)

function getData(req,res){
  res.send(projectData)
}

// Add weather entry with POST request 
app.post('/addEntry', cors(), addEntry);

function addEntry(req,res){
  newEntry = {
    temp: req.body.temp,
    date: req.body.date,
    feelings: req.body.feelings
}
  projectData.push(newEntry);
  res.send(projectData);
  console.log(projectData)
}