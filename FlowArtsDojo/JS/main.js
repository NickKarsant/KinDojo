// var lintStream = require('jslint').LintStream;



firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// create reservationData object which will be populated with user input
var reservationData = {};









function validEmailInput() {
	var clientEmail = document.querySelector('#email');
    // Check to see whether the user has entered a value to the email field.
		if (clientEmail.value === null) {
      // If the email field is blank, display a message to the user.
      document.getElementByClassName('.reservation-email').innerText = 'Please enter a name.';
      // Add an error class to the input field that will give it a red border.
			clientEmail.className = 'error';
			return false;
    } else {
      // Otherwise, clear out the error message.
      document.getElementById('email').innerText = '';
      // Remove the error class from the input field
			clientEmail.className = '';
			return true;
    }
}

function validDateInput() {
  var dateInputField = document.querySelector('#date');
    // Check to see whether the user has entered a value to the date field.
    if (dateInputField.value === null) {
      // If the email field is blank, display a message to the user.
      document.getElementByClass('.reservation-date').innerText = 'Please enter a date.';
      // Add an error class to the input field that will give it a red border.
			dateInputField.className = 'error';
			return false;
    } else {
      // Otherwise, clear out the error message.
      document.getElementById('date').innerText = '';
      // Remove the error class from the input field
			dateInputField.className = '';
			return true;
    }
}
function validTimeInput() {
  var timeInputField = document.querySelector('#time');
    // Check to see whether the user has entered a value to the time field.
    if (timeInputField.value === null) {
      // If the email field is blank, display a message to the user.
      document.getElementByClass('.reservation-time').innerText = 'Please enter a time.';
      // Add an error class to the input field that will give it a red border.
			timeInputField.className = 'error';
			return false;
    } else {
      // Otherwise, clear out the error message.
      document.getElementById('time').innerText = '';
      // Remove the error class from the input field
			timeInputField.className = '';
			return true;
    }
}
function validClassInput() {
  var classInputField = document.querySelector('#classes');
    // Check to see whether the user has entered a value to the email field.
    if (classInputField.value === null) {
      // Add an error class to the input field that will give it a red border.
			classInputField.className = 'error';
    } else {
      // Otherwise, clear out the error message.
      document.getElementById('classes').innerText = '';
      // Remove the error class from the input field
			classInputField.className = '';
			return true;
    }
}


function showLoadingIcon() {
  document.getElementById('loading').style.display = "block";
}



// function validNameInput() {
// 	var clientName = document.querySelector('#name');
//     // Check to see whether the user has entered a value to the name field.
// 		if (clientName.value === null) {
//       // If the email field is blank, display a message to the user.
//       document.getElementById('name').innerText = 'Please enter a name.';
//       // Add an error class to the input field that will give it a red border.
			
// 			$('input').removeClass('reservation-name');
// 			$('input').addClass('error');

// 			return false;
//     } else {
//       // Otherwise, clear out the error message.
//       document.getElementById('name').innerText = '';
//       // Remove the error class from the input field
// 			clientName.className = '';
// 			return true;
//     }
// }

function validNameInput() {
	var clientName = document.querySelector('#name');
    // Check to see whether the user has entered a value to the name field.
		if (clientName.value === null) {
      // If the email field is blank, display a message to the user.
      document.getElementById('name').innerText = 'Please enter a name.';
      // Add an error class to the input field that will give it a red border.
			clientName.className = 'error';
			return false;
    } else {
      // Otherwise, clear out the error message.
      document.getElementById('name').innerText = '';
      // Remove the error class from the input field
			clientName.className = '';
			return true;
    }
}


// when submitted, the name data should be set
// and all data should be sent to your database
 //unsure of how to submit form
	$('.reservation-form').on('submit', function(event) {
		event.preventDefault();

		showLoadingIcon();

		//  if (validNameInput()){
		// 	 console.log("It worked")
		//  }

		if (validNameInput()
			&&validEmailInput()
			&& validDateInput()
			&& validTimeInput()
			&& validClassInput() ) {
			reservationData.name = $('.reservation-name').val();
			reservationData.email = $('.reservation-email').val();
			reservationData.date = $('.reservation-date').val();
			reservationData.time = $('.reservation-time').val();
			reservationData.class = $('.reservation-class').val();
		} else {
			document.getElementById('required').style.display = "block";
		};

		showLoadingIcon();
		

		// create a section for reservations data in your db
		var reservationsReference = database.ref('reservations');

		reservationsReference.push(reservationData);
	});



// retrieve reservations data when page loads and when reservations are added
function getReservations() {

  // use reference to database to listen for changes in reservations data
  database.ref('reservations').on('value', function(results) {

    // Get all reservations stored in the results we received back from Firebase
    var allReservations = results.val();

    // remove all list reservations from DOM before appending list reservations
    $('.reservations').empty();

    // iterate (loop) through all reservations coming from database call
    for (var reservation in allReservations) {

      // Create an object literal with the data we'll pass to Handlebars
      var context = {
        name: allReservations[reservation].name,
				day: allReservations[reservation].day,
				date: allReservations[reservation].date,
				time: allReservations[reservation].time,
				class: allReservations[reservation].class,
				
        reservationId: reservation
      };


      // Get the HTML from our Handlebars reservation template
      var source = $("#reservation-template").html();

      // Compile our Handlebars template
      var template = Handlebars.compile(source);

      // Pass the data for this reservation (context) into the template
      var reservationListItem = template(context);

      // Append newly created reservation to reservations list.
      $('.reservations').append(reservationListItem);

    }

  });

}

// When page loads, get reservations
// getReservations();








// $(window).on('scroll', function() { 
  
//   var coverDistance = $('.cover').offset().top;

//   var distanceScrolled = $(window).scrollTop();
  
//   if (distanceScrolled >= coverDistance) {
//    $('.cover').addClass('scrolled');
//   }else {
//      $('.cover').removeClass('scrolled');
//   }
// });








