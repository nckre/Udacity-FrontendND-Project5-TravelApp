# Weather-Journal App Project

## Overview
This web app leverages a [Node JS](https://https://nodejs.org/en/) server and the Web API of [Open Weather Map](https://openweathermap.org) to dynamically update a web page with user and weather data.

## Get Started
1. Run the `server.js` file via the terminal by running `node server.js` in the respective directory
2. Open the web page on your browser at `http://localhost:3000/`
3. Enter a valid zip code (e.g. `94040`), a country code (e.g. `us`) and your feelings into the respective input fields
4. Click on the `Generate` button to update the server with your entries & display the most recent entry below the input fields

## Setup
The webapp consists of 2 main parts:
* `server.js` a NodeJS server using various `node.js ` packages ([Express](http://expressjs.com/), [body-parser](https://github.com/expressjs/body-parser#readme) and [CORS](https://github.com/expressjs/cors#readme)) 
* `app.js` a JavaScript app that dynamically updates the content of `website.html` based on user input & server data

### Server Side
The sever stores `projectData`, which is in an empty list upon intialisation of the server and then filled by user input from the client via POST calls to the API endpoint `/addEntry`. The project data can be retrieved via `/all`.

### Client Side
1. An event listener is added to the click of the generate button. 
2. Upon clicking the button, a GET call is made to the OpenWeatherMap API. It retrieves the current weather for the zip & country code entered in the respective input fields. 
3. The current temperature is retrieved from the response object. This information is posted to the sever along with the current date and the input from the "How are you feeling today?" field. 
4. The UI is updated to GET the latest entry from the server and display it in the "Most Recent Entry" `div`.

## Further Improvements
The design is the standard design from Udacity and the boxes are not well aligned. In the future, changes to the design would be desirable. In addition, it would be beneficial to introduce a check for user input in the zip & country code field (or, at the least, a warning when the API does not returns a `400` error for an invalid code). 