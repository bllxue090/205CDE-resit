var user = JSON.parse(localStorage.getItem("user"));

if(user==null) {
	alert("You don't have access to this page!");
	window.location.href='./signin.html';
}

var courseID = localStorage.getItem("courseID");

//alert(courseID);

window.onload = showQuesiton;

function showQuesiton() {
	$('#welcome').html("Hi, " + user.Name);
	
	
	$.ajax({
	    cache: true,
	    type: "POST",
	    url:"./php/getquestion.php",
	    data:{
	    	course:courseID
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
		var str = "<span>There is no question in this course!</span><br/>";
		if(user.Access == 2) {
			str += "<span><a href='mycourse.html'>Back to Your Courses Page.</a></span>";
		} else if(user.Access == 1) {
			str += "<span><a href='studentcenter.html'>Back to Your Courses Page.</a></span>";
		}
		$('#container').html(str);
		return;
	}
	
	var str = "";
	
	for(var i=0; i<data.length; i++) {
		var btn = '<div class="btn-group btn-group-sm">'
		+'<button type="button" class="btn btn-primary" onclick="addReply('+data[i].ID+')">Answer</button>'
		+'</div>';
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
				+'<span class="discussionPost">'+data[i].Name+' asked at '+data[i].time+'</span>'
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

function addReply(id) {
	var str='<form role="form"><div class="form-group">'
	    +'<textarea id="replyContent'+id+'" class="form-control" rows="3"></textarea>'
	    +'<button type="button" style="margin-top:10px" class="btn submitButton" onclick="submitReply('+id+')">Submit</button>'
	    +'<button type="button" style="margin-top:10px;margin-left:10px" class="btn cancelButton" onclick="cancelReply('+id+')">Cancel</button>'
	    +' </div></form>';

	$('#reply'+id).html(str);    
	$('#reply'+id).show(200);
}

function cancelReply(index) {
	$('#reply'+index).html("");
	$('#reply'+index).hide(400); 
}

function submitReply(index) {
	var reply = $('#replyContent'+index).val();
	
	$.ajax({
	    cache: true,
	    type: "POST",
	    url:"./php/addanswer.php",
	    data:{
	    	question:index,
	    	answer: reply
	    	
	    },
	    async: false,
	    error: function(request) {
	        alert("Connection error");
	    },
	    success: function(data) {
	    	var info = '<div id="myAlert" class="alert alert-success">'
				+'    <a href="#" class="close" data-dismiss="alert">&times;</a>'
				+'    <strong>Submit Reply Success!</strong>'
				+'</div>';
	    	$('#btnDiv'+index).html(reply);
	    	$('#reply'+index).html(info);
	    }
	});		
}
