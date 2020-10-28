//API URL and keys
const geonamesURL = 'http://api.geonames.org/searchJSON?q=';
const username = "rahulkr0518";
const weatherbitURL = "https://api.weatherbit.io/v2.0/forecast/daily?";
const weatherbitkey = "cfd3de69dbae4dcca25bb216bd0ae3f5";
const pixabayURL = "https://pixabay.com/api/?key=";
const pixabaykey = "17404119-cd28b7c8f498d7e7ba39b573b";
// Other Variables
const final = document.querySelector("#result");
const depDate = document.querySelector('input[name="date"]');
const depart = document.querySelector('input[name="from"]');
const arrival = document.querySelector('input[name="to"]');
const form = document.querySelector("#form");
const delButton = document.querySelector("#delete");
//Function to get deatils of Arrival City using Geonmaes API (by default no of rows is 10 changed it to 5)
export const getCity= async (geonamesURL, aCity, username) => {
  const res = await fetch(geonamesURL + aCity + "&maxRows=5&username=" + username);
  try {
    const cityDetails = await res.json();
    return cityDetails;
  } catch (error) {
    console.log("error", error);
  }
};
//Function to get details of weather using Weatherbit API 
export const getWeather = async (lat, long, daysToGo) => {
    const req = await fetch(weatherbitURL + "lat=" + lat + "&lon=" + long + "&key="+ weatherbitkey );
    try {
        const weatherData = await req.json();
        const weatherDetails=weatherData["data"][daysToGo];
        return weatherDetails;
    } catch (error) {
        console.log("error", error);
    }
}
//Function to post result using Pixabay API
export const update = async (newData) => {
    final.classList.remove("invisible");
    final.scrollIntoView({ behavior: "smooth" });
    const res = await fetch(pixabayURL + pixabaykey + "&q=" + newData.aCity + "+city&image_type=photo");
    try {
        const image = await res.json();
        const dateSplit = newData.dDate.split("-").reverse().join(" / ");
        document.querySelector("#Pixabay").setAttribute('src', image.hits[0].webformatURL);
        document.querySelector("#city").innerHTML = newData.aCity;
        document.querySelector("#date").innerHTML = dateSplit;
        document.querySelector("#days").innerHTML = newData.daysToGo;
        document.querySelector("#details").innerHTML = newData.details;
        document.querySelector("#temp").innerHTML = newData.weatherDetails;
    
    }
    catch (error) {
        console.log("error", error);
    }
}
//Function to post data in server
export const postData = async (url = '', data = {}) => {
    const req = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({
            dCity: data.dCity,
            aCity: data.aCity,
            dDate: data.dDate,
            weatherDetails: data.weatherDetails,
            details: data.details,
            daysToGo: data.daysToGo
        })
    })
    try {
        const newData = await req.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

//Event Listener of Sumbit
form.addEventListener('submit', addTripDetails);
export function addTripDetails(val) {
    val.preventDefault();
    const dCity = depart.value;
    const aCity = arrival.value;
    const dDate = depDate.value;
    const tsn = (Date.now()) / 1000;
    const ts = (new Date(dDate).getTime()) / 1000;
    const daysToGo = (Math.round((ts - tsn) / 86400));
    Client.inputCheck(dCity, aCity);
    getCity(geonamesURL, aCity, username)
      .then((cityDetails) => {
          const lat = cityDetails.geonames[0].lat;
          const long = cityDetails.geonames[0].lng;
          const weatherDetails = getWeather(lat, long, daysToGo)
          return weatherDetails;
      })
      .then((weatherDetails) => {
          const newData = postData('http://localhost:8081/add', { dCity, aCity, dDate, weatherDetails: weatherDetails.temp, details: weatherDetails.weather.description, daysToGo });
          return newData;
      }).then((newData) => {
          update(newData);
      })
}
delButton.addEventListener('click', function (val) {
    final.classList.add("invisible");
    location.reload();
})