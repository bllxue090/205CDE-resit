localStorage.removeItem("user");


function check(form) {
	
	if($('#username').val() == "") {
		alert("Please enter your username!");
		$('#username')[0].focus();
		return false;
	}
	
	if($('#usernameReminder').css('display') != 'none') {
		return false;
	} 
	if(password1Validate($('#password1').val()) == false) {
		return false;
	}
	if(password2Validate($('#password1').val(), $('#password2').val()) == false) {
		return false;
	}
	
	if($('#name').val() == "") {
		alert("Please enter your name!");
		$('#name')[0].focus();
		return false;
	}
	

	if($('input[name="userType"]:checked').length ==0) {
		alert("Please select your user type!");
		return false;
	}
	
	if($('#email').val() != "") {
		if(emailValidate($('#email').val()) == false) {
			alert("The pattern of email is incorrect!");
			$('#email')[0].focus();
			return false;
		}
	}
	
	$.ajax({
        cache: true,
        type: "POST",
        url:"./php/signup.php",
        data:$('#myForm').serialize(),
        async: false,
        error: function(request) {
            alert("Connection error");
        },
        success: function(data) {
			//alert(data);
        	alert("Signup Success");
        	window.location.href='./signin.html';
        }
    });
}

function usernameValidate() {
	$('#usernameReminder').hide();
	$.ajax({
        cache: true,
        type: "POST",
        url:"./php/checkuser.php",
        data:{
        	username:$('#username').val()
        },
        async: false,
        error: function(request) {
            alert("Connection error");
        },
        success: function(data) {
        	var result = JSON.parse(data);
			if(result.length > 0) {
				$('#usernameReminder').show();
			}
        }
    });
}


function password1Validate(password) {
	var pattern = /^(?:(?!\s).){5,}$/;
	if(pattern.test(password) == false) {
		$('#password1Reminder').show();
		return false;
	}
}

function emailValidate(email) {
	var pattern = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
	if(pattern.test(email) == false) {
		return false;
	}
}


function password1change() {
	$('#password1Reminder').hide();
	$('#password2Reminder').hide();
}


function password2Validate(pswd1, pswd2) {
	if(pswd1 != pswd2) {
		$('#password2Reminder').show();
		return false;
	}
}

function password2change() {
	$('#password1Reminder').hide();
	$('#password2Reminder').hide();
}




function cancelSignup() {
	window.location.href='./signin.html';
}