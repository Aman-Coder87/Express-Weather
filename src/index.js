// Required npm Packages for the Web Application //
const express = require('express');
const path = require('path');
const fs = require('fs');
const requests = require('requests');
const chalk = require('chalk');
const hbs = require('hbs');

// Setting up Express App //
const app = express();
const port = process.env.PORT || 8080;

// path declaration //
const staticPath = path.join(__dirname, '../public');
const templatePath = path.join(__dirname, '../templates/views');

// Using Application function templeates engine and all //
app.set('view engine', 'hbs');
app.set('views', templatePath);

// partials regiatering process //
hbs.registerPartials(__dirname + '/../templeates/partials');

// static Path to Public Folder //
app.use(express.static(staticPath));


// Fetching Data with api from App Express //
let city = 'Bajrabarahi' ;

requests(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7f6480c0040676cf62c7fa294ca443aa`)
.on('data', (chunk) => {
    const objData = JSON.parse(chunk);
    const arrData = [objData];
    
    // Data For The Haldelbars (hbs) //
    let mainTemp = Math.round((arrData[0].main.temp) - 273.15);
    let windSpeed = arrData[0].wind.speed ;
    let longitude = arrData[0].coord.lon ;
    let latitude = arrData[0].coord.lat ;
    let place = arrData[0].name ;
    let countryName = arrData[0].sys.country ;

    // console.log(arrData);
    console.log(mainTemp);

    // Javascript Date Constructor //
    const date = new Date() ;
    
    // Data for Handelbars(hbs) //
    let day = date.getDay();
    let month = date.getMonth();
    let dates = date.getDate();
    let hour = date.getHours();
    let minute = checkTime(date.getMinutes());
    let ss = checkTime(date.getSeconds());
    
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    let greeting ;
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    if (hour > 12) {
        hour = hour - 12;
        if (hour == 12) {
            hour = checkTime(hour);
            let times = hour+":"+minute+":"+ss+"_" + "AM";
            greeting = 'Morning';
        } else if (hour >= 6 && hour != 12 ) {
            greeting = 'Evening' ;
          } else {
            hour = checkTime(hour);
            times = hour+":"+minute+":"+ss+"_" + "PM";
            greeting = 'Afternoon' ;
        } 
    } else {
        times = hour+":"+minute+":"+ss+"_" + "AM";
    }

    // Setting Up The App Routes //
    // Home Page Routing //
    app.get('/', (req, res) => {
        res.render('index', {
            temp: mainTemp,
            wind: windSpeed,
            lon: longitude,
            lat: latitude,
            place: place,
            countryName: countryName,
            day: days[day] ,
            months: months[month] ,
            date: dates ,
            greeting: greeting ,
        });
    });

    // 404 Error Page Routing //
    app.get('*', (req, res) => {
        res.render('error');
    });
    // End Routing //

})
.on('end', (err) => {
    if (err) return console.log('connection closed due to errors', err);
});

// listenning Express App running on a server //
app.listen(port, () => {
    console.log(chalk.red.bgBlue.bold('http://127.0.0.1:8080'));
});