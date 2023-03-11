const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    // console.log(req.body.cityName);
    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q= " + query + "&appid=0d1caa84fb0396eafa4e2c8a49224ea7&units=metric";

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            // console.log(data);
            const weatherData = JSON.parse(data);
            // const object = {
            //     name: "Ghouse",
            //     favouriteFood: "Biryani"
            // }
            // console.log(JSON.stringify(object));
            const temp = weatherData.main.temp;
            const feel = weatherData.main.feels_like;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

            // one method to send the data using html
            // this is the modern (html) method of doing it with html
            res.send(`<h2>The Weather is currently ${description}.</h2><h1>The Temperature in ${query} is ${temp} degree Celcius.</h1><img src = ${imageURL}>`);

            //another method to send the data usin html
            //we are using standard method of html
            // res.send("<h1>The Temperature in london is "+ temp + "degree Celcius.</h1>")

            //we can send multiple writes but we can send only one send
            //after using multiple writes we can send it all one together
            // res.write("<h2>The Weather is Currently "+ description+ ".</h2>");
            // res.write("<h1>The Temperature in London is "+ temp + "degree Celcius.</h1>");
            // res.send();

            // console.log(temp);
            // console.log(feel);
            // console.log(description);
        });
    });
    // res.send("Server is Up");

});


app.listen(3000, function () {
    console.log("Server is Running successfully");
});
