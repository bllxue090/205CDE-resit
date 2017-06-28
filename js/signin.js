function login(form) {
	
	if($('#username').val() == "") {
		alert("Please enter your account!");
		$('#username')[0].focus();
		return false;
	}
	
	if($('#password').val() == "") {
		alert("Please enter your password!");
		$('#password')[0].focus();
		return false;
	}
	

	$.ajax({
        cache: true,
        type: "POST",
        url:"./php/signin.php",
        data:$('#myForm').serialize(),
        async: false,
        error: function(request) {
            alert("Connection error");
        },
        success: function(data) {
        	var result = JSON.parse(data);
        	if(result != null) {
	        	localStorage.setItem("user", JSON.stringify(result[0]));
	        	//alert("Signin success!");
	        	if(result[0].Access == 1) {
	        		window.location.href='./studentcenter.html';
	        	}
	        	if(result[0].Access == 2) {
	        		window.location.href='./mycourse.html';
	        	}
	        	//window.location.href='./home.html';
        	} else {
        		$('#LoginReminder').show();
        	}
        }
    });
}



function signup() {
	window.location.href='./signup.html';
}

function passwordchange() {
	$('#LoginReminder').hide();
}

function namechange() {
	$('#LoginReminder').hide();
}