const lalitpur = document.getElementById('Lalitpur');
const bhaktapur = document.getElementById('Bhaktapur');
const usa = document.getElementById('Usa');
const lonUsa = document.getElementById('lonUsa');
const latUsa = document.getElementById('latUsa');

async function USA(city) {
    let api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7f6480c0040676cf62c7fa294ca443aa`);
    let jsonData = await api.json();
    let temp = Math.round(jsonData.main.temp - 273.15) ;
    usa.innerHTML = temp ;
    longitude = jsonData.coord.lon ;
    latitude = jsonData.coord.lat ;
    lonUsa.innerHTML = longitude ;
    latUsa.innerHTML = latitude ;
}
USA('Usa') ;

async function Lalitpur(city) {
    let api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7f6480c0040676cf62c7fa294ca443aa`);
    let jsonData = await api.json();
    let temp = Math.round(((jsonData.main.temp - 273.15) * 9/5) + 32 ) ;
    lalitpur.innerHTML = temp ;
}
Lalitpur('Lalitpur') ;

async function Bhaktapur(city) {
    let api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7f6480c0040676cf62c7fa294ca443aa`);
    let jsonData = await api.json();
    let temp = Math.round(((jsonData.main.temp - 273.15) * 9/5) + 32) ;
    bhaktapur.innerHTML = temp ;
}
Bhaktapur('Bhaktapur') ;