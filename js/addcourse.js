var user = JSON.parse(localStorage.getItem("user"));
//alert(localStorage.getItem("user"));
if(user==null || user.Access != 2) {
	alert("You don't have access to this page!");
	window.location.href='./signin.html';
}
window.onload = showCourseList;


function showCourseList() {
	$('#welcome').html("Hi, " + user.Name);
}

function addCourse(form) {

	$.ajax({
        cache: true,
        type: "POST",
        url:"./php/addcourse.php",
        data:{
        	name:$("#name").val(),
        	startDate:$("#startDate").val(),
        	endDate:$("#endDate").val(),
        	description:$("#description").val(),
            number:$("#number").val(),
        	creater:user.ID
        },
        async: false,
        error: function(request) {
            alert("Connection error");
        },
        success: function(data) {
        	alert("Add course success!");
	        window.location.href='./mycourse.html';
        }
    });

}