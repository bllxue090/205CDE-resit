//alert(localStorage.getItem("user"));
var user = JSON.parse(localStorage.getItem("user"));

if(user.Access != 1) {
	alert("You don't have access to this page!");
	window.location.href='./signin.html';
}

window.onload = showCourseList;


function showCourseList() {
	$('#welcome').html("Hi, " + user.Name);
	$.ajax({
	    cache: true,
	    type: "POST",
	    url:"./php/getallcourselist.php",
	    data:{
	    	creater:user.ID
	    },
	    async: false,
	    error: function(request) {
	        alert("Connection error");
	    },
	    success: function(data) {
	    	$('#courselist').html(showCourse(data));
	    }
	});
}

var courseID;

function showCourse(data) {
	var requests = JSON.parse(data);
	var str = "";
	for(var i=0; i<requests.length; i++) {

		
		
		var btn;
		if((requests[i].currentnumber >= requests[i].totalnumber) || requests[i].start < (new Date()).simpleDateString()) {
			btn = "";
		} else {
			btn = '<button class="btn btn-primary" onclick="apply('+requests[i].ID+')"  data-toggle="modal" data-target="#myModal">Apply</button>';
		}
		    str += '<tr>'
	     	   +'   <td>'+requests[i].name+'</td>'
	     	   +'   <td>'+requests[i].start+'</td>'
	     	   +'   <td>'+requests[i].end+'</td>'
	     	   +'   <td>'+requests[i].totalnumber+'</td>'
	     	   +'   <td>'+requests[i].currentnumber+'</td>'	     	   
	     	   +'   <td>'
	     	   + btn;
	     	   +'   </td>'
	     	   +'</tr>';
	}
	return str;
}


function apply(course) {
	$.ajax({
	    cache: true,
	    type: "POST",
	    url:"./php/applycourse.php",
	    data:{
	    	user:user.ID,
	    	course:course
	    },
	    async: false,
	    error: function(request) {
	        alert("Connection error");
	    },
	    success: function(data) {
	    	var info = '<div id="myAlert" class="alert alert-success">'
				+'    <a href="#" class="close" data-dismiss="alert">&times;</a>'
				+'    <strong>Apply Success!</strong>'
				+'</div>';
	    	
	    	$('#response').append(info);
	    	$('#response').show();
	    }
	});
}
