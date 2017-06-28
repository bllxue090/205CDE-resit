var user = JSON.parse(localStorage.getItem("user"));

if(user==null) {
	alert("You don't have access to this page!");
	window.location.href='./signin.html';
}

var courseID = localStorage.getItem("courseID");

//alert(courseID);

window.onload = showDiscussion;

function showDiscussion() {
	$('#welcome').html("Hi, " + user.Name);
	$.ajax({
	    cache: true,
	    type: "POST",
	    url:"./php/getdiscussionlist.php",
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
		var str = "<span>There's no discussion posted in this course!</span><br/>";
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
		var number = i+1;
		str += '<div class="list-group"><div class="list-group-item questionTitleBar"><h4 class="list-group-item-heading questionTitle">Discussion '
				+number
				+'</h4>'
				+'<span class="discussionPost">Posted at '+data[i].createtime+'</span>'
				+ '</div><div class="list-group-item"><p class="questionContent">'
				+data[i].title
				+'</p></div><div class="list-group-item">'
				+'<div class="btn-group btn-group-sm">'
				+'<button type="button" class="btn btn-default" onclick="addReply('+data[i].discussionid+')">Add Reply</button>'
				+'<button type="button" class="btn btn-primary" onclick="showReplies('+data[i].discussionid+')">Show Replies</button>'
				+'</div></div>'
				+'<div id= "reply'+data[i].discussionid+'" class="list-group-item" style="display:none"></div>'
				+'<div id= "content'+data[i].discussionid+'" class="list-group-item" style="display:none"></div>'
				+'</div>';
	}

	$('#container').html(str);
	
}

function showReplies(id) {
	//alert(id);
	$.ajax({
	    cache: true,
	    type: "POST",
	    url:"./php/getreplylist.php",
	    data:{
	    	id:id
	    },
	    async: false,
	    error: function(request) {
	        alert("Connection error");
	    },
	    success: function(data) {
	    	showReplyList(id, data);
	    }
	});	
}

function showReplyList(id, data) {
	data = JSON.parse(data);
	
	if(data.length == 0) {
		var str = "<span>There is no reply in this discussion!</span>";
		$('#content'+id).html(str);
		$('#content'+id).show();
		return;
	}
	
	var str = "";
	
	for(var i=0; i<data.length; i++) {
		str += '<div class="list-group-item comment commentlist">'
			+'<div class="list-group-item commentlist commentTitle"><span class="author">'+data[i].Name+'</span> replied in '
			+'<span class="date">'+data[i].createtime+'</span>'
			+'<a onclick="addReply('+id+')" style="margin-left:10px">Reply</a></div>'
			+ '<div class="list-group-item commentlist"><p class="commentContent">'+data[i].content+'</p>'
			+'</div>'
			+'<div  class="list-group-item commentlist" style="display:none"></div>'
			+'</div>';
		if(i != data.length -1)
			str += '<hr class="commentsLine"/>';
	}

	$('#content'+id).html(str);
	$('#content'+id).show();	
}


function addReply(id) {
	var str='<form role="form"><div class="form-group">'
	    +'<label for="name" class="reminder">Please input your reply:</label>'
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
	    url:"./php/addreply.php",
	    data:{
	    	discussionid:index,
	    	content: reply,
	    	creater: user.ID
	    	
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
	    	$('#reply'+index).html(info); 
	    }
	});	
	
}
