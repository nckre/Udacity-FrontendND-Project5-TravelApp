const tokenAPI = "2406d2e50203d6bc95f60446820351fd";
const baseURI = "http://api.openweathermap.org/data/2.5/weather?zip=";

//Function to GET, POST data & update UI with it
function handleSubmit(event){
  event.preventDefault()
  weatherLookup()
  .then(function(data){
    // Create a new date instance dynamically with JS
    let d = new Date();
    let currentDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
    // Get journal input
    let feelings = document.getElementById('feelings').value;
    // Post date, temp and user input
    postWeatherLog('/addEntry', {temp:data.main.temp, date:currentDate, feelings:feelings});
  }).then(function(data){
    updateUI()
  })
}

// GET weather from zip location
const weatherLookup = async ()=>{
  const zip = document.getElementById('zip').value;
  const countryCode = document.getElementById('country').value;
  const res = await fetch(`${baseURI}${zip},${countryCode}&appid=${tokenAPI}`)
  try {
    const weatherData = await res.json();
    console.log(weatherData);
    return weatherData
  } catch(error) {
    console.log("error", error);
  }
}

// POST weather data & user input to server endpoint
const postWeatherLog = async ( url = 'http://localhost:3000/addEntry', data = {})=>{
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type':'application/json',
    },
    body: JSON.stringify(data),
  })
  try {
    const newData = await response.json();
    console.log(newData)
  }catch(error) {
    console.log("error", error);
  }
}

// Update UI with weather data & user input
const updateUI = async () => {
  const request = await fetch('http://localhost:3000/weather');
  const tempDiv = document.getElementById('temp');
  const dateDiv = document.getElementById('date');
  const contentDiv = document.getElementById('content');
  try{
    const projectData = await request.json();
    const lastEntry = projectData.slice(-1)[0];
    console.log(lastEntry);
    tempDiv.innerHTML = `Temperature: ${lastEntry.temp}`;
    dateDiv.innerHTML = `Date: ${lastEntry.date}`;
    contentDiv.innerHTML = `Feelings: ${lastEntry.feelings}`;
  }catch(error){
    console.log("error",error);
  } 
}

// Event listener for click on generate
/* document.getElementById('generate').addEventListener('click', function(){
  weatherApp1()
});
 */
export { handleSubmit }