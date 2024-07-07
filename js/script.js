let cities = JSON.parse(localStorage.getItem('cities')) || [];
//City input function
$('#formEnter').on('click', function (e) {
  e.preventDefault();
  const city = $('#cityInput').val();
  $('#city').text(city);

  $.get({
    url: `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=483a53306eacda4704b24e0d2bddcae4`,
  })
    .then(function (data) {
      $('#cardGrid').html('');
      $('#currBox').html('');
      const lat = data[0].lat;
      const lon = data[0].lon
      handleCurrCity(lat, lon);
      requestCityData(lat, lon);
    })
});

//Current data handler
function handleCurrCity(lat, lon) {
  $.get({
    url: `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=483a53306eacda4704b24e0d2bddcae4`,
  })
    .then(function (data) {
      console.log(data);
      $('#currBox').css('display', 'block')
      $('#currBox').append(`
      <p class="title">${data.name} ${data.dt}</p>
<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png">
      <p>${data.main.temp} °F</p>
      <p>${data.main.humidity}%</p>
      <p>${data.wind.speed} MPH</p>
`)
    })
}
//City forecast request
function requestCityData(lat, lon) {
  $.get({
    url: `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=483a53306eacda4704b24e0d2bddcae4`
  })
    .then(function (data) {
      for (let i = 0; i < data.list.length; (i += 8)) {
        addCard(data.list[i]);
      }
    })
}

//Create forecast cards
function addCard(dayData) {
  console.log(dayData.dt_txt);
  $('#cardGrid').append(`   
<div class="card cell mb*-0">
<p class="title">${dayData.dt_txt}</p>
<img src="https://openweathermap.org/img/wn/${dayData.weather[0].icon}.png">
      <div class="card-content">
<p>Temp: ${dayData.main.temp} °F</p>
<p>Humidity: ${dayData.main.humidity}%</p>
<p>Wind: ${dayData.wind.speed} MPH</p>
      </div>
    </div>
`)
}
