var user = JSON.parse(localStorage.getItem("user"));

var courseID = localStorage.getItem("courseID");

//alert(courseID);

window.onload = showQuesiton;

function showQuesiton() {
	$('#welcome').html("Hi, " + user.Name);
	$.ajax({
	    cache: true,
	    type: "POST",
	    url:"./php/getmyquestion.php",
	    data:{
	    	course:courseID,
	    	user:user.ID
	    },
	    async: false,
	    error: function(request) {
	        alert("Connection error");
	    },
	    success: function(data) {
	    	show(data);
	    }
	});	
}

function show(data) {
	//alert(data);
	data = JSON.parse(data);
	
	if(data.length == 0) {
		var str = "<span>There is no question in this course!</span><br/>"
			+"<span><a href='studentcenter.html'>Back to Your Courses Page.</a></span>";
		$('#container').html(str);
		return;
	}
	
	var str = "";
	
	for(var i=0; i<data.length; i++) {
		var btn = '';
		$.ajax({
		    cache: true,
		    type: "POST",
		    url:"./php/getanswer.php",
		    data:{
		    	question:data[i].ID
		    },
		    async: false,
		    error: function(request) {
		        alert("Connection error");
		    },
		    success: function(result) {
		    	result = JSON.parse(result);
		    	//alert(result.length);
		    	if(result.length !=0) {
		    		btn = result[0].answer;
		    	}
		    }
		});	
		
		
		var number = i+1;
		str += '<div class="list-group"><div class="list-group-item questionTitleBar"><h4 class="list-group-item-heading questionTitle">Question '
				+number
				+'</h4>'
				+ '</div><div class="list-group-item"><p class="questionContent">'
				+data[i].content
				+'</p></div><div class="list-group-item" id="btnDiv'+data[i].ID+'">'
				+btn
				+'</div>'
				+'<div id= "reply'+data[i].ID+'" class="list-group-item" style="display:none"></div>'
				+'</div>';
	}

	$('#container').html(str);
	
}