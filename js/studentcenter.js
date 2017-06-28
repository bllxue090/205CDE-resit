var user = JSON.parse(localStorage.getItem("user"));
//alert(localStorage.getItem("user"));
if(user==null || user.Access != 1) {
	alert("You don't have access to this page!");
	window.location.href='./signin.html';
}

window.onload = showCourseList;


function showCourseList() {
	$('#welcome').html("Hi, " + user.Name);
	$.ajax({
	    cache: true,
	    type: "POST",
	    url:"./php/getappliedcourse.php",
	    data:{
	    	user:user.ID
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
		    str += '<tr>'
	     	   +'   <td>'+requests[i].name+'</td>'
	     	   +'   <td>'+requests[i].start+'</td>'
	     	   +'   <td>'+requests[i].end+'</td>'
	     	   +'   <td>'+requests[i].totalnumber+'</td>'
	     	   +'   <td>'+requests[i].currentnumber+'</td>'	     	   
	     	   +'   <td><button class="btn btn-primary myBtn" onclick="postDiscussion('+requests[i].ID+')"  data-toggle="modal" data-target="#myModal">Post Question</button><br/>'
	     	  +'    <button class="btn btn-default myBtn" onclick="showQuesiton('+requests[i].ID+')">View Answer</button><br/>'
	     	 +'    <button class="btn btn-primary myBtn" onclick="showDiscussion('+requests[i].ID+')">Discussion</button>'
	     	   +'   </td>'
	     	   +'</tr>';
	}
	return str;
}

function postDiscussion(data) {
	courseID = data;
}

function post() {
	$.ajax({
	    cache: true,
	    type: "POST",
	    url:"./php/addquestion.php",
	    data:{
	    	course:courseID,
	    	content:$('#content').val(),
	    	student:user.ID
	    },
	    async: false,
	    error: function(request) {
	        alert("Connection error");
	    },
	    success: function(data) {
	    	$('#content').attr("value", "");
	    	$('#myModal').modal('hide');
	    }
	});	
}

function showDiscussion(id) {
	localStorage.setItem("courseID", id);
	window.location.href='./showdiscussion.html';
}

function showQuesiton(id) {
	localStorage.setItem("courseID", id);
	window.location.href='./viewmyquestion.html';
}
