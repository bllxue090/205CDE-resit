function logout() {
	localStorage.removeItem("user");
	window.location.href='./signin.html';
}