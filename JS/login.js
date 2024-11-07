var login_username="admin";
var login_password="12345";

function load(){
  $(document).ready(function(){
     $(".login").show(); //show class login when you load the page
     $(".logout").hide(); //hide class logout when you load the page
     $(".menuLogin").hide() // show menuLogin
  });	
}

function authenticate_login()
{
  var v1, v2;
  v1 = document.getElementById("user").value;
  //v1 = document.form1.firstname.value;
  v2 = document.getElementById("pwd").value;

  $(document).ready(function(){

  if ((v1 == login_username) && (v2 == login_password))
	{
	  alert('Welcome to our website');
	  document.getElementById("uname").innerHTML = "Welcome " + login_username + "<br>";
        $(".login").hide(); //hide class login
        $(".logout").show(); //show class logout
        $(".menuLogin").show() // show menuLogin
	}
	else
	{
	      $(".login").show(); //show class login
        $(".logout").hide(); //hide class logout
	  alert('Invalid User or Password Login (use ' + login_username + ' and ' + login_password +')');
	  document.getElementById("pwd").value="";
	  document.getElementById("pwd").focus();
	}
  });	//end jQuery
}


function authenticate_logout()
{
  alert('Thank you!');
  document.getElementById("user").value="";
  document.getElementById("pwd").value="";
  document.getElementById("user").focus();
  parent.frames.Content_Frame.location.href ="./Pages/Home.htm";
    $(document).ready(function(){
     $(".login").show(); //show class login
     $(".logout").hide(); //hide class logout
     $(".menuLogin").hide() // show menuLogin
  });	
}