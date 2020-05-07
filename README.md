# Chrome Extension for Weather Forecast

### Setup
* Used the [doc](https://developer.chrome.com/extensions/getstarted) for initialising the extension folder.
* Used geolocation api to get the current location of the user.
* Used [Openweather API](https://openweathermap.org/forecast5) to fetch weather forecast for 5 days.
* Used http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=***** - where latitude and longitude are retreived from onject returned by geolocation API and APPID is from the OpenWeather API after registration to fethc data - fetching is done using **fetch API**.
* Used JQuery for making life easier while dealing with DOM elements!

### Usage
* Download the folder.
* On Chrome, open **Extensions** page of the browser.
* Click **Load Unpacked** and select the downloaded folder.

### Working
* The weather forecast JSON object fetched from the API is stored in ```chrome.storage.local``` using the ```set``` method.
* The stored JSON is taken from ```chrome.storage.local``` using ```get``` method.
* Using this object - the DOM of the extension (essentially the popup.html) is manipulated using JQuery to show the forecast.

### Results
* The extension shows forecast for 5 day period - 40 different forecasts with 3 hours intervals
* 40 different buttons are generated in a horizontal scroll view - where when one is clicked - the details of weather forecast are changed in the ```weather-info``` div
* Some snapshots :  
  
#### Initial render on clicking the extension icon : 
  ![Initial](https://i.imgur.com/y3mXuJ5.png)  
#### On Click :
  ![After Click](https://i.imgur.com/oLWFIoX.png)
