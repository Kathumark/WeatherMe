	if (location.protocol !== 'https:') {
	  alert('Use SSL (https://) in order for the page to work correctly. Update your URL link in your address bar.')
	}

	$(document).ready(function() {
	  'use strict';
    
    let currentTempC = 0;
	  let currentTempF = 0;
	  let userTemp = "C";
	  //debugger;
	  // do stuff when DOM is ready
	  //What happens if you are not in a town or close to a big one?
	  if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(success)
	  }


	$("#btnTemp").on("click", function() {


	  $("#CF").html('<a href="#">C</a>');

	  if (userTemp === "C") {
	    userTemp = "F";
	    $("#CF").html('F'); //'<a href="#">F</a>'
	    $("#min").html(currentTempF);
	  } else {
	    userTemp = "C";
	    $("#CF").html('C'); //<a href="#">C</a>
	    $("#min").html(currentTempC);
	  }
	});

	function success(position) {
	  $.getJSON('https://api.wunderground.com/api/674d636f90347367/geolookup/conditions/q/' + position.coords.latitude + ',' + position.coords.longitude + '.json', update);
	}

	function update(data) {
	  // console.log(data);
	  $("#city").html(data.location.city + ', ' + data.location.country_name);
	  $("#temp").html("The Current Temperature is ");
	  $("#min").html(data.current_observation.temp_c);
	  $("#CF").html(" C");
	  $("#min").html(data.current_observation.temp_c);
	  $("#humidity").html("Humidity is " + data.current_observation.relative_humidity);
	  $("#weather").html("Weather is <img src=" + data.current_observation.icon_url + " alt='simple picture representing current weather'/img> " + data.current_observation.weather);
    currentTempC = data.current_observation.temp_c;
          currentTempF = data.current_observation.temp_f;
	}

	function handleErr(jq, texterror, number) {
	  console.log("An error occurred, with number " + number + " and text " + texterror);
	}
    	});