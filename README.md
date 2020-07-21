# Travel Planner Project

## Overview
This web app leverages a [Node JS](https://https://nodejs.org/en/) server and the APIs of [Geonames](http://www.geonames.org/), [Weatherbit](https://www.weatherbit.io/) and [Pixabay](https://pixabay.com/) to let users plan a travel trip. After inputting the City, Startdate and Enddate of their trip, the app pulls weather information and a stock picture of the location and shows this to the user along with her trip data.

## Get Started
1. Install Node JS and the various dependent packages listed in `package.js`
2. Run `npm run build-prod` to update the `dist` folder with `index.html`, `main.css` and `main.js`
3. Run the `server.js` file via the terminal by running `npm run start` in the respective directory
4. Open the web page on your browser at `http://localhost:3000/`
5. Enter a valid City Name (e.g. `Paris`), pick a start date that's at least 1 day in the future and and end date 1+ days after start date.
6. Click on the `Add Trip` button to update the server with your entries & display the most recent trip below the input fields

## Setup
The webapp consists of 2 main parts:
* `/src/server/index.js` a NodeJS server using various `node.js ` packages ([Express](http://expressjs.com/), [body-parser](https://github.com/expressjs/body-parser#readme) and [CORS](https://github.com/expressjs/cors#readme)) 
* `/src/client/index.js` a JavaScript app that dynamically updates the content of `/src/client/views/index.html` based on user input & server data. The app functionality is mostly provided in `/src/client/js/addTrip.js` which is imported into `/src/client/index.js`

### Server Side
The sever stores `tripData`, which is in an empty list upon intialisation of the server and then filled by user input from the client via POST calls to the API endpoint `/addTrip`. The trip data can be retrieved via a GET call to `/trips`.

### Client Side
1. An event listener is added to the click of the add trip button. 
2. Upon clicking the button, various GET calls are made to APIs specified above. 
3. The UI is updated to GET the latest entry from the server and display it in the "Most Recent Entry" `div`.

## Further Improvements
### Known Errors
The Historic API for Weatherbit is only available for a free trial and will stop working with the provided API key. It also returns temperatures at a much worse rate than the Weatherbit Forecast API. The API should be replaced with a different provider for a better app.

### Security
The app stores API keys in the frontend. While these API keys are only used to make GET calls to free services, it's not advisable to make the calls in the frontend. In a future version, the API calls should instead be made from the NodeJS server and stored in an `.env` file that's part of `gitignore`.

### Roadmap
Udacity provided a list of roadmap items, out of which a single one was picked. Other items could be included in future versions:
- [x] Add end date and display length of trip.
- [ ] Pull in an image for the country from Pixabay API when the entered location brings up no results (good for obscure localities).
- [ ] Allow user to add multiple destinations on the same trip.
- [ ] Pull in weather for additional locations.
- [ ] Allow the user to add hotel and/or flight data.
- [ ] Multiple places to stay? Multiple flights?
- [ ] Integrate the REST Countries API to pull in data for the country being visited.
- [ ] Allow the user to remove the trip.
- [ ] Use Local Storage to save the data so that when they close, then revisit the page, their information is still there.
- [ ] Instead of just pulling a single day forecast, pull the forecast for multiple days.
- [ ] Incorporate icons into forecast.
- [ ] Allow user to Print their trip and/or export to PDF.
- [ ] Allow the user to add a todo list and/or packing list for their trip.
- [ ] Allow the user to add additional trips (this may take some heavy reworking, but is worth the challenge).
- [ ] Automatically sort additional trips by countdown.
- [ ] Move expired trips to bottom/have their style change so it’s clear it’s expired.