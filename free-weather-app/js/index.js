var lat,lon;
var tempUnit = 'C';
var currentTempInCelsius;
var url = "https://fcc-weather-api.glitch.me/api/current?";

//updatePlace
function updatePlace(city,country) {
  $("#city").text(city);
  $("#country").text(country);
}

//Update Weather
function updateWeather(data) {
  updatePlace(data.name,data.sys.country);  
  currentTempInCelsius = Math.round(data.main.temp * 10) / 10;
  $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
  $("#tempunit").text(tempUnit);
  $(".status").html(data.weather[0].main );
  $(".icon").html("<img src='"+data.weather[0].icon+"' class='img-center'>");;
}
//Weather Information
function getWeatherInfo(lat,lon) {
  lat = "lat="+ lat;
  lon = "&lon="+ lon;
  url = url+lat+lon;
  console.log(url);
  
  //API Request
  $.getJSON(url,function(data) {
    updateWeather(data);
  })
}

//Update weather

//Load Function
$(document).ready(function () {
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function (position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      getWeatherInfo(lat,lon);
    });
  }
  else {
    console.log("Geolocation is not supperted in your browser!");
  }
  $("#tempunit").click(function () {
    var currentTempUnit = $("#tempunit").text();
    var newTempUnit = currentTempUnit == "C" ? "F" : "C";
    $("#tempunit").text(newTempUnit);
    if (newTempUnit == "F") {
      var fahTemp = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
      $("#temp").text(fahTemp + " " + String.fromCharCode(176));
    } else {
      $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
    }
  });
});