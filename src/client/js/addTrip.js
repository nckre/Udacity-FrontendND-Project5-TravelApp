// Search Pixabase for the image of a city and return first result
const pixabaySearch = async (city) => {
    const pixaKey = "17563206-ffbd8efa2809ee43f7963c9f8";
    const response = await fetch (`https://pixabay.com/api/?key=${pixaKey}&q=${city}&image_type=photo`);
    try{
        const searchResults = await response.json();
        const picture = searchResults.hits[0].webformatURL;
        console.log(picture);
        return picture
    }catch(error){
        console.log("error", error);
}}

// Search geoname for latitude and longitude of a city name, return first result
const geonameSearch = async (city) => {
const response = await fetch(`http://api.geonames.org/searchJSON?q=${city}&username=timetotravel`);
  try{
    const searchResults = await response.json();
    const cityResult = searchResults.geonames[0];
    let coordinates = {
        name: cityResult.toponymName,
        lat: cityResult.lat,
        lng: cityResult.lng
    }
    console.log(coordinates)
    return coordinates
  }catch(error){
    console.log("error", error);
    alert("This didn't seem to be a proper city name, please try again")
  }
} 

// Look up the weather at a specific latitude and longitude via Weatherbit API
const weatherLookup = async (coordinates, timeDifference, startDate) => {
    const key = "ad767b9f50154aeda2ba8dd8e856262c"
    const corsAnywhere = "https://cors-anywhere.herokuapp.com/"
    const forecast = "http://api.weatherbit.io/v2.0/forecast/daily?lat="
    const history = "http://api.weatherbit.io/v2.0/history/daily?lat="
    // Use Forecast API for trips within the next 7 days
    if (timeDifference < 7) {
        const url = corsAnywhere+forecast+coordinates.lat+"&lon="+coordinates.lng+"&days=7&key="+key;
        const shortTermForecast = await fetch(url);
        try {
            const weatherForecast = await shortTermForecast.json();
            let temp = weatherForecast.data[timeDifference+1].temp
            return temp
        }catch(error){
            console.log("error", error);
    }} else {
    let dummyDate = addDay(startDate);
    // Use History API for future trips not within the next 7 days 
    let url = corsAnywhere+history+coordinates.lat+"&lon="+coordinates.lng+"&start_date="+startDate+"&end_date="+dummyDate+"&key="+key;
    const longTermForecast = await fetch(url);
    try {
        const weatherHistory = await longTermForecast.json();
        if (weatherHistory.data === 'undefined') {
            alert("No historic weather data found at the location")
        } else {
            let temp = weatherHistory.data.temp
            return temp
        }
    }catch(error){
        console.log("error", error);
} 
}}

// Calculate the duration of the trip as time difference between start and end date
function travelTime (startDate, endDate) {
    const start = dateify(startDate);
    const end = dateify(endDate);
    const difference = end.getTime() - start.getTime();
    if (difference > 0) {
        return difference / (1000 * 3600 * 24);
    } else {
        alert("Please pick a end date that's after the start date")
    }
}

// Check how many days from now the trip is starting.
function dateCountdown (startDate) {
    let today = new Date();
    let travelDate = dateify(startDate); 
    console.log(today);
    console.log(travelDate);
    const difference = travelDate.getTime() - today.getTime();
    if (difference >= 0) {
        return Math.floor(difference / (1000 * 3600 * 24));
    } else {
        alert("Please pick a day that's at least 1 day in the future for the start of your trip")
    }
}

// Convert YYYY-MM-DD date to JS date
function dateify (simpleDate) {
    let year = simpleDate.substring(0,4);
    let month = simpleDate.substring(5,7);
    let day = simpleDate.substring(8,10);
    let newDate = new Date(year, month-1, day);
    return newDate
}

// Add a day to YYYY-MM-DD date to create dummy enddate for Weatherbit History API
function addDay(date) {
    let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + (d.getDate() + 1),
    year = d.getFullYear();
if (month.length < 2) 
    month = '0' + month;
if (day.length < 2) 
    day = '0' + day;
return [year, month, day].join('-');
}


// POST weather data & user input to server endpoint
const postTrip = async ( url = 'http://localhost:3000/addTrip', data = {})=>{
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type':'application/json',
    },
    body: JSON.stringify(data),
  })
  try {
    return response
  }catch(error) {
    console.log("error", error);
  }
}

 // Update UI with trip data received from server
const updateUI = async () => {
    const request = await fetch('http://localhost:3000/trips');
    try{
      const trips = await request.json();
      const lastTrip = trips.slice(-1)[0];
      console.log(lastTrip);
      const tripCity = document.getElementById('tripCity');
      tripCity.innerHTML = `City: ${lastTrip.city}`;
      const tripStart = document.getElementById('tripStart');
      tripStart.innerHTML = `Start Date: ${lastTrip.start_date}`;
      const tripEnd = document.getElementById('tripEnd');
      tripEnd.innerHTML = `End Date: ${lastTrip.end_date}`;
      const tripDuration = document.getElementById('tripDuration');
      tripDuration.innerHTML = `Duration in Days: ${lastTrip.duration}`;
      const tripTemp = document.getElementById('tripTemp');
      tripTemp.innerHTML = `Temperature at Location (Celsius): ${lastTrip.temperature}`;
      const tripPic = document.getElementById('tripPic');
      tripPic.src = `${lastTrip.preview}`;
    }catch(error){
      console.log("error",error);
    }  
  } 

// Add a trip to the server & receive the last trip to update UI
async function addTrip(event){
    event.preventDefault()
    const city = document.getElementById('city').value; 
    const startDate = document.getElementById('start_date').value;
    const endDate = document.getElementById('end_date').value;
    const timeDifference = dateCountdown(startDate);
     if (city && timeDifference >= 0) {
        const travelPeriod = travelTime(startDate, endDate);
        let destination = await geonameSearch(city);
        let weather = await weatherLookup(destination, timeDifference, startDate);
        let picture = await pixabaySearch(city);
        let tripData = {
            goto: city,
            start: startDate,
            end: endDate,
            duration: travelPeriod,
            temp: weather,
            pic: picture 
        };
        let newTrip = await postTrip('/addTrip', tripData);
        if (newTrip) {
            console.log("Trip posted to server");
            let refresh = await updateUI()
        }
    } else {
        alert("Please enter a city and select a start date in the future before adding a trip")
    }  
}


export { addTrip }