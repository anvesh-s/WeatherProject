const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
}); 

app.post("/",function (req,res){

    const query = req.body.cityName;
    const apiKey = "78f2ab4b3b6d874a7a31ec769235501f";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=metric";

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData = JSON.parse(data);

            //const object = {
            //    name:"Anvesh",
            //    favoriteFood: "Ramen"
            //}
            //console.log(JSON.stringify(object));
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("The temperature in " + query + "is " + temp + " degree Celcius.");
            res.write(" The weather is currently "+ weatherDescription );
            //res.write("<img src=" + imageURL + ">");
            res.send();
            //console.log(weatherData);
        })

    })
});



    





app.listen(port ,function(){
    console.log("Server is running on port 3000.");
});