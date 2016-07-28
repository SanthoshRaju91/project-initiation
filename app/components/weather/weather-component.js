(function() {
  angular.module('weather.component', [])
  .constant('LocationAPI_URL', 'https://muslimsalat.com/daily.json?callback=JSON_CALLBACK')
  .constant('WeatherAPI_URL', 'http://api.openweathermap.org/data/2.5/forecast/daily?q=')
  .factory('cache', ['$cacheFactory', function($cacheFactory) {
    return $cacheFactory('cache', {
      capacity: 100
    });
  }])
  .factory('http', ['$http', 'cache', function($http, cache) {
    //Header configurations
    let headers = {
      'cache': cache,
      'dataType': 'json'
    };
    //APPID for api.openweathermap.org, without this you will get the valid response.
    let APPID = 'bc1e24c531732375aece237bb2a5d49a';
    return {
      config: headers,
      get: function(url, succes, fail) {
        return $http.get(url + '&APPID=' + APPID, this.config);
      },
      getLocal: function(url, succes, fail) {
        return $http.get(url);
      },
      jsonp: function(url, success, fail) {
        return $http.jsonp(url, this.config);
      }
    };
  }])
  .factory('weatherAPI', ['http', 'LocationAPI_URL', 'WeatherAPI_URL', function(http, LocationAPI_URL, WeatherAPI_URL) {
    return {
      getLocation: function() {
        return http.jsonp(LocationAPI_URL);
      },
      getWeather: function(city) {
        return http.get(WeatherAPI_URL + city + '&mode=json&units=metric');
      }
    }
  }])
  .component('weatherCanvas', {
    bindings: {},
    templateUrl: '../templates/components/weather/weather-canvas.html',
    controller: ['weatherAPI', function(weatherAPI) {
      let self = this;
      self.forecast = {}; // forecast object to be displayed.
      self.currentTime = moment().format('h:mm a');
      weatherAPI.getLocation().then(function(resp) {
        weatherAPI.getWeather(resp.data.city + ',' + resp.data.country_code).then(function(response) {
          this.data = response.data;
          if(this.data.list.length) {
            this.today = this.data.list.filter(function(current) {
              if(moment.unix(current.dt).format('MMMM Do YYYY') == moment().format('MMMM Do YYYY')) {
                return current;
              };
            });
            self.forecast.today = moment().format('ddd');
            self.forecast.date = moment().format('MMMM Do');
            self.forecast.weatherIcon = 'http://openweathermap.org/img/w/' + this.today[0].weather[0].icon + '.png';
            self.forecast.temperature = this.today[0].temp.day;
            self.forecast.min = this.today[0].temp.min;
            self.forecast.max = this.today[0].temp.max;
          }
        }); // end of getWeather
      }); // end of getLocation
    }]
  });
}());
