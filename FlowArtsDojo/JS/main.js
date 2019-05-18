
const firebaseConfig = {
  apiKey: "AIzaSyCA6gjlHyesnip_QCr9-TV9mA48sofPVDU",
  authDomain: "reservation-site-93cb2.firebaseapp.com",
  databaseURL: "https://reservation-site-93cb2.firebaseio.com",
  projectId: "reservation-site-93cb2",
  storageBucket: "reservation-site-93cb2.appspot.com",
  messagingSenderId: "89005609281",
  appId: "1:89005609281:web:f50957798441d793"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// create reservationData object which will be populated with user input
var data = {
	name: '',
	email: '',
	date: '',
	starttime: '',
	endtime: '',
	lesson: '',
	students: ''
};


function validEmailInput() {
	var clientEmail = document.querySelector('#email');
    // Check to see whether the user has entered a value to the email field.
		if (clientEmail.value === '') {
      // If the email field is blank, display a message to the user.
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
    if (dateInputField.value === '') {
      // If the email field is blank, display a message to the user.
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
function validStartTimeInput() {
  let timeInputField = document.querySelector('#starttime');
    // Check to see whether the user has entered a value to the time field.
    if (timeInputField.value === '') {
      // If the email field is blank, display a message to the user.
			
      // Add an error class to the input field that will give it a red border.
			timeInputField.className = 'error';
			return false;
		} else if (timeInputField.value < "09:00"){
			document.getElementById('early').style.display = "inline";
			timeInputField.className = 'error';
	
		// } else if (timeInputField.value > "18:00"){
		// 	document.getElementById('late').style.display = "inline";		
		// 	timeInputField.className = 'error';
    } else {
			if (timeInputField.value >= "09:00"){
				document.getElementById('early').style.display = "none";
			}
			// Otherwise, clear out the error message.
      document.getElementById('starttime').innerText = '';
      // Remove the error class from the input field
			timeInputField.className = '';
			return true;
    }
}
function validEndTimeInput() {
  let timeInputField = document.querySelector('#endtime');
    // Check to see whether the user has entered a value to the time field.
    if (timeInputField.value === '') {
      // If the email field is blank, display a message to the user.

      // Add an error class to the input field that will give it a red border.
			timeInputField.className = 'error';
			return false;

		// } else if (timeInputField.value < "10:00"){
		// 	timeInputField.className = 'error';
		// 	document.getElementById('early').style.display = "inline";
		
		} else if (timeInputField.value > "19:00"){
			document.getElementById('late').style.display = "inline";
			timeInputField.className = 'error';

    } else {
			if (timeInputField.value <= "19:00"){
				document.getElementById('late').style.display = "none";
			}
			// Otherwise, clear out the error message.
      document.getElementById('endtime').innerText = '';
      // Remove the error class from the input field
			timeInputField.className = '';
			return true;
    }
}

function validClassInput() {
  var classInputField = document.querySelector('#lesson');
    // Check to see whether the user has entered a value to the email field.
    if (classInputField.value === '') {
      // Add an error class to the input field that will give it a red border.
			classInputField.className = 'error';
    } else {
      // Otherwise, clear out the error message.
      document.getElementById('lesson').innerText = '';
      // Remove the error class from the input field
			classInputField.className = '';
			return true;
    }
}




function validNameInput() {
	var clientName = document.querySelector('#name');
    // Check to see whether the user has entered a value to the name field.
		if (clientName.value === '') {
      // If the email field is blank, display a message to the user.
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
function validStudentsInput() {
	var numStudents = $("#students option:selected").val();
    // Check to see whether the user has entered a value to the name field.
		if (numStudents === '') {
      // If the email field is blank, display a message to the user.
      // Add an error class to the input field that will give it a red border.
			$('#students').css({"border": "2px solid red"});
			// numStudents.className = 'error';
			return false;
    } else {   
			// Remove the error class from the input field
			$('#students').css({"border": "1px solid grey"});
			return true;
    }
}

$(function(){
	var select = $(".1-20");
	for (i='';i<=5;i++){
			select.append($('<option></option>').val(i).html(i))
	}
});




function confirmSavedToDatabase(){
	console.log("saved to database");
	document.getElementById('complete').style.display = "block";

	// create a section for reservations data in your db
	var reservationsReference = database.ref('reservations');


	if (reservationsReference.push(data)) {
		setTimeout(function(){location.reload()}, 5000);
	}

}


// when submitted, the name data should be set
// and all data should be sent to your database
 //unsure of how to submit form
 function doValidation(){
		
	console.log('form submitted');
	
	event.preventDefault();


	if (validNameInput()
		&& validEmailInput()
		&& validDateInput()
		&& validStartTimeInput()
		&& validEndTimeInput()  
		&& validStudentsInput()
		&& validClassInput() ) {
		data.name = $('#name').val();
		data.email = $('#email').val();
		data.date = $('#date').val();
		data.starttime = $('#starttime').val();
		data.endtime = $('#endtime').val();
		data.lesson = $('#lesson').val();
		data.students = $("#students option:selected").val();
		console.log('all fields passed validation');
		document.getElementById('required').style.display = "none";
		confirmSavedToDatabase();

	} else {
		document.getElementById('required').style.display = "block";
		console.log('validation error');
	};

}

// SEND CONFIRMATION EMAIL WITH RESERVATION DETAILS
// ADD RESERVATION TO FLOW ARTS DOJO CALENDAR AND MAKE VISIBLE ON BOOKING PAGE


// var lastIndex = reservationsReference.length - 1
// var recentRes = reservationsReference[lastIndex] 


// var name = recentRes.name
// var email = recentRes.email
// var date = recentRes.date
// var starttime =recentRes.starttime
// var endtime = recentRes.endtime
// var students = recentRes.students
// var lesson = recentRes.lesson






function validEmail() {
	var email = document.querySelector('#inputEmail');
    // Check to see whether the user has entered a value to the email field.
		if (email.value === '') {
      // If the email field is blank, display a message to the user.
      // Add an error class to the input field that will give it a red border.
			email.className = 'error';
			return false;
    } else {

      // Otherwise, clear out the error message.
      document.getElementById('inputEmail').innerText = '';
      // Remove the error class from the input field
			email.className = '';
			return true;
    }
}
function validName() {
	var name = document.querySelector('#inputName');
    // Check to see whether the user has entered a value to the name field.
		if (name.value === '') {
      // If the email field is blank, display a message to the user.
      // Add an error class to the input field that will give it a red border.
			name.className = 'error';
			return false;
    } else {
      // Otherwise, clear out the error message.
      document.getElementById('inputName').innerText = '';
      // Remove the error class from the input field
			name.className = '';
			return true;
    }
}
function validMessage() {
	var message = document.querySelector('#inputMessage');
    // Check to see whether the user has entered a value to the email field.
		if (message.value === '') {
      // If the email field is blank, display a message to the user.
      // Add an error class to the input field that will give it a red border.
			message.className = 'error';
			return false;
    } else {

      // Otherwise, clear out the error message.
      document.getElementById('inputMessage').innerText = '';
      // Remove the error class from the input field
			message.className = '';
			return true;
    }
}

// CONTACT FORM


function emailValidation(){


	console.log('form submitted');


	if (validName()
		&& validEmail()
		&& validMessage() ){
			console.log('all validation passed')
			// var mess = document.querySelector('#inputMessage').value;
		$.ajax({
			url: "https://formspree.io/nkarsant@gmail.com",
			method: "POST",
			data: $('#inputMessage').serialize,
			dataType: "json"
		});
		document.getElementById('required').style.display = "none";
		document.getElementById('complete').style.display = "block";
		console.log("email sent");
	} else {
		event.preventDefault();
		document.getElementById('required').style.display = "block";
		console.log('email not sent');
	}

}



var object = ['http://www.googleapis.com/calendar/v3/calendars/4mlk5ojf94gnh75kuqfe80kk00@group.calendar.google.com/events?key=AIzaSyABZMCI0bkCTBNyBFoJ5-Qxvjcop_dYqYg'];
var API_KEY = 'AIzaSyABZMCI0bkCTBNyBFoJ5-Qxvjcop_dYqYg';
var SCOPE	= ["https://www.googleapis.com/auth/calendar.events"];

var client_secret ='0_Cq-gDkLd0Po_pdaBkA1kLV';
var cleint_id = '709080659537-hsmf7tjbu4a9kslkk08fo9ag7e54nvj0.apps.googleusercontent.com';





// script
  var GoogleAuth;
  var SCOPE = 'https://www.googleapis.com/auth/calendar.events';
  function handleClientLoad() {
    // Load the API's client and auth2 modules.
    // Call the initClient function after the modules load.
		gapi.load('client:auth2', initClient); 
		}

  function initClient() {
    // Retrieve the discovery document for version 3 of Google Drive API.
    // In practice, your app can retrieve one or more discovery documents.
    var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

    // Initialize the gapi.client object, which app uses to make API requests.
    // Get API key and client ID from API Console.
    // 'scope' field specifies space-delimited list of access scopes.
    gapi.client.init({
        'apiKey': 'AIzaSyABZMCI0bkCTBNyBFoJ5-Qxvjcop_dYqYg',
        'discoveryDocs': [discoveryUrl],
        'clientId': 'clientId',
        'scope': SCOPE
    }).then(function () {
      GoogleAuth = gapi.auth2.getAuthInstance();

      // Listen for sign-in state changes.
      GoogleAuth.isSignedIn.listen(updateSigninStatus);

      // Handle initial sign-in state. (Determine if user is already signed in.)
      var user = GoogleAuth.currentUser.get();
      setSigninStatus();

      // Call handleAuthClick function when user clicks on
      //      "Sign In/Authorize" button.
      $('#sign-in-or-out-button').click(function() {
        handleAuthClick();
      }); 
      $('#revoke-access-button').click(function() {
        revokeAccess();
      }); 
    });
  }

  function handleAuthClick() {
    if (GoogleAuth.isSignedIn.get()) {
      // User is authorized and has clicked 'Sign out' button.
      GoogleAuth.signOut();
    } else {
      // User is not signed in. Start Google auth flow.
      GoogleAuth.signIn();
    }
  }

  function revokeAccess() {
    GoogleAuth.disconnect();
  }

  function setSigninStatus(isSignedIn) {
    var user = GoogleAuth.currentUser.get();
    var isAuthorized = user.hasGrantedScopes(SCOPE);
    if (isAuthorized) {
      $('#sign-in-or-out-button').html('Sign out');
      $('#revoke-access-button').css('display', 'inline-block');
      $('#auth-status').html('You are currently signed in and have granted ' +
          'access to this app.');
    } else {
      $('#sign-in-or-out-button').html('Sign In/Authorize');
      $('#revoke-access-button').css('display', 'none');
      $('#auth-status').html('You have not authorized this app or you are ' +
          'signed out.');
    }
  }

  function updateSigninStatus(isSignedIn) {
    setSigninStatus();
  }
// script




/* <button id="sign-in-or-out-button"
        style="margin-left: 25px">Sign In/Authorize</button>
<button id="revoke-access-button"
        style="display: none; margin-left: 25px">Revoke access</button>

<div id="auth-status" style="display: inline; padding-left: 25px"></div><hr> */


