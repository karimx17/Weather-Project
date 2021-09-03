require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");


const https = require("https");

app.use(bodyParser.urlencoded({extended: true}))


app.get("/",function(req,res) {
    res.sendFile(__dirname + "/index.html")

});

app.post("/", function(req,res) {
    
const query = req.body.cityName;
const apiKey = process.env.API_KEY;
const units = "metric"
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&units="+ units + "&appid=" + apiKey;

https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.write("<h1>Temperature is: " + temp + "</h1>");
        res.write("<h1> The weather in " + query +" is currently: " + description + "</h1>");
        res.write("<img src = "+ imageUrl + ">")
        res.send();
        
    })
})
})

app.listen(3000,function() {
    console.log("Server running")
})

