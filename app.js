
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html")
});

app.post("/", function (req, res) {
  console.log(req.body.cityName);
  const zip = req.body.cityName;
  const apiKey = "58fd640ca5127f3da7c3225915e50d38";
  const unit = "imperial";
  const url = "https://api.openweathermap.org/data/2.5/weather?zip=" + zip + "&appid=" + apiKey + "&units=" + unit;

  https.get(url, function(response) {
    console.log(response);
    response.on("data", function(data) {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.feels_like
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<p>The weather is currently " + weatherDescription + "</p>")
      res.write("<h1>The temperature in " + zip + " is " + temp + " degrees.</h1>")
      res.write("<img src=" + imageURL + ">");
      res.send();
    })
  })
});

// To get the weather data you want, paist the url you created in Postman into the https.get . Make sure you include https://. To avoid being commented out, make it a string.
// You could put the string in the get, but it would be better to give it the cost "url" and put url into the get instead, so you can create a callback function.
// Since "res" is already part of the first function, give the second functio a "response", so not to confuse them.
// Use the .on method, parse the weatherData, and console.log weatherData using JSON.parse

// When you get this notification: [nodemon] app crashed - waiting for file changes before starting...
// it means res sent twice. res can only send once, and 'send' must be the last thing.

app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
