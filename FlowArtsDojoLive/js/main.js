
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



// CONTACT FORM


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


// RESERVATION/BOOKING FORM

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


