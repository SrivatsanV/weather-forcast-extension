// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";

let $location = $("#location");
let $info = $("#info");
let $weatherButtons = $("#weather-buttons");
let weather;
let i = 0;

navigator.geolocation.getCurrentPosition(position => {
  fetch(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&APPID=e9748f3f89410e0e40d1b2185c2d9b46`
  )
    .then(function(response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }

      // Parse response into json
      response.json().then(function(data) {
        console.log(data);
        let city = data.city;
        weather = data.list;

        //storing the city and weather details in local storage
        chrome.storage.local.set({ city: city, weather: weather }, function() {
          //retreiving data from local storage
          chrome.storage.local.get(["city"], function(result) {
            let city = result.city;
            let html = "<h4>Location: " + city.name + "</h4>";
            $location.append(html);
          });
          chrome.storage.local.get(["weather"], function(result) {
            let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]; //for displaying a day for a given date
            weather.forEach(w => {
              //a card element to display day, the icon and temperature
              let card = document.createElement("button");
              card.setAttribute("id", i);
              card.setAttribute("class", "cardUI");

              //icon element
              let icon = document.createElement("img");
              icon.setAttribute("class", "icon");

              //temperature - shown in degree celcius
              let t_cel = Math.floor(w.main.temp - 273);
              let h = "<h5>" + t_cel + "<span>&deg;C</span></h5>";

              let url = `http://openweathermap.org/img/wn/${w.weather[0].icon}@2x.png`;
              icon.src = url;
              let date = new Date(w.dt_txt);
              let day = "<h4>" + days[date.getDay()] + "</h4>";
              let time = date.getHours() + ":00 hrs";
              let timeHtml = "<h5>" + time + "</h5>";

              $(card).append(day);
              $(card).append(icon);
              $(card).append(h);
              $(card).append(timeHtml);
              $weatherButtons.append(card);
              i++;
            });
            if (i >= 39) {
              $("#0").addClass("selected");
              let item = weather[0];

              let icon = document.createElement("img");
              icon.setAttribute("class", "icon-info");
              let url = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
              icon.src = url;

              let min_temp = Math.floor(item.main.temp_min - 273);
              let max_temp = Math.floor(item.main.temp_max - 273);
              let html = document.createElement("div");
              html.setAttribute("id", "weather");
              let innHtml =
                "<h5>Min Temp:   " +
                min_temp +
                "<span>&deg;C</span>&emsp;Max Temp: " +
                max_temp +
                "<span>&deg;C</span></h5>" +
                "<h5>Pressure: " +
                item.main.pressure +
                "Pa</h5>" +
                "<h5>Humidity: " +
                item.main.humidity +
                "%</h5>" +
                "<h5>Forecast: " +
                item.weather[0].description +
                "</h5>";
              $(html).append(innHtml);
              $info.append(icon);
              $info.append(html);
            }
          });
        });
      });
    })
    .catch(function(err) {
      console.log("Fetch Error :-S", err);
    });
});

check();
function check() {
  if ($("button").is(":visible")) {
    $("button").click(function() {
      $("button").removeClass("selected");
      $(this).addClass("selected");
      let id = parseInt(this.id);
      let item = weather[id];

      $("#weather").remove();
      $(".icon-info").remove();

      let icon = document.createElement("img");
      icon.setAttribute("class", "icon-info");
      let url = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
      icon.src = url;
      let html = document.createElement("div");
      html.setAttribute("id", "weather");

      let min_temp = Math.floor(item.main.temp_min - 273);
      let max_temp = Math.floor(item.main.temp_max - 273);
      let innHtml =
        "<h5>Min Temp: " +
        min_temp +
        "<span>&deg;C</span>&emsp;Max Temp: " +
        max_temp +
        "<span>&deg;C</span></h5>" +
        "<h5>Pressure: " +
        item.main.pressure +
        "Pa</h5>" +
        "<h5>Humidity: " +
        item.main.humidity +
        "%</h5>" +
        "<h5>Forecast: " +
        item.weather[0].description +
        "</h5>";
      $(html).append(innHtml);
      $info.append(icon);
      $info.append(html);
    });
    return;
  } else {
    setTimeout(check, 50);
  }
}
