/*
	Copyright Hadrian Bell (Dev1lroot) All Rights Reserved.
	------------------------------------------------------
	Requirements: JQuery@3.5.1
*/
$(document).ready(function()
{
	/* проверяем принятие лицензии */
	function checkLicense(){
		if($("#acceptToS").prop('checked'))
		{
			console.log('лицензия принята!');
			$("#registerButtonOff").hide();
			$("#registerButtonOn").show();
		}
		else
		{
			console.log('лицензия не принята!');
			$("#registerButtonOff").show();
			$("#registerButtonOn").hide();
		}
	}
	checkLicense();
	$("#acceptToS").click(function(event){
		checkLicense();
	});
});
function release() //Функция сброса подсказок после ошибок
{
	//Поля
	$("#authUsername").removeClass("border-danger");
	$("#authPassword").removeClass("border-danger");

	$("#registerEmail").removeClass("border-danger");
	$("#registerUsername").removeClass("border-danger");
	$("#registerPasswordA").removeClass("border-danger");
	$("#registerPasswordB").removeClass("border-danger");

	//Тексты
	$("#errorAuthUsernameNotFound").addClass("d-none");
	$("#errorAuthUsernameMismatch").addClass("d-none");
	$("#errorAuthPasswordMismatch").addClass("d-none");
	$("#errorAuthUsernameDataNull").addClass("d-none");
	$("#errorAuthPasswordDataNull").addClass("d-none");
	$("#errorAuthEntranceTimeout").addClass("d-none");

	$("#errorRegisterEmailMismatch").addClass("d-none");
	$("#errorRegisterEmailHasTaken").addClass("d-none");
	$("#errorRegisterUsernameTaken").addClass("d-none");
	$("#errorRegisterUsernameSucks").addClass("d-none");
	$("#errorRegisterUsernameEmpty").addClass("d-none");
	$("#errorRegisterPasswordShort").addClass("d-none");
	$("#errorRegisterPasswordTEasy").addClass("d-none");
	$("#errorRegisterPasswordError").addClass("d-none");

}
function reports(errors) //Функция вывода ошибок
{
	for(var error in errors)
	{
		switch (errors[error])
		{
			case "user_not_found":
				$("#authUsername").addClass("border-danger");
				$("#errorAuthUsernameNotFound").removeClass("d-none");
				break;
			case "unvalid_username":
				$("#authUsername").addClass("border-danger");
				$("#errorAuthUsernameMismatch").removeClass("d-none");
				break;
			case "register_unvalid_username":
				$("#registerUsername").addClass("border-danger");
				$("#errorRegisterUsernameSucks").removeClass("d-none");
				break;
			case "password_mismatch":
				$("#authPassword").addClass("border-danger");
				$("#errorAuthPasswordMismatch").removeClass("d-none");
				break;
			case "unvalid_password":
				$("#authPassword").addClass("border-danger");
				$("#errorAuthPasswordMismatch").removeClass("d-none");
				break;
			case "username_is_null":
				$("#authUsername").addClass("border-danger");
				$("#errorAuthUsernameDataNull").removeClass("d-none");
				break;
			case "password_is_null":
				$("#authPassword").addClass("border-danger");
				$("#errorAuthPasswordDataNull").removeClass("d-none");
				$("#errorRegisterPasswordTEasy").addClass("d-none");
				break;
			case "entrance_timeout":
				$("#errorAuthEntranceTimeout").removeClass("d-none");
				break;
			case "bruteforce_detected":
				$("#errorAuthBruteforce").removeClass("d-none");
				break;
			case "register_unvalid_email":
				$("#registerEmail").addClass("border-danger");
				$("#errorRegisterEmailMismatch").removeClass("d-none");
				break;
			case "register_email_is_null":
				$("#registerEmail").addClass("border-danger");
				$("#errorRegisterEmailMismatch").removeClass("d-none");
				break;
			case "register_password_mismatch":
				$("#registerPasswordA").addClass("border-danger");
				$("#registerPasswordB").addClass("border-danger");
				$("#errorRegisterPasswordError").removeClass("d-none");
				break;
			case "register_password_too_easy":
				$("#registerPasswordA").addClass("border-danger");
				$("#registerPasswordB").addClass("border-danger");
				$("#errorRegisterPasswordTEasy").removeClass("d-none");
				break;
			case "register_password_is_null":
				$("#registerPasswordA").addClass("border-danger");
				$("#errorRegisterPasswordShort").removeClass("d-none");
				break;
			case "register_username_is_null":
				$("#registerUsername").addClass("border-danger");
				$("#errorRegisterUsernameEmpty").removeClass("d-none");
				break;
			case "username_already_taken":
				$("#registerUsername").addClass("border-danger");
				$("#errorRegisterUsernameTaken").removeClass("d-none");
				break;
			case "email_already_taken":
				$("#registerEmail").addClass("border-danger");
				$("#errorRegisterEmailHasTaken").removeClass("d-none");
				break;
		}
	}
	if(errors.includes("register_password_is_null"))
	{
		$("#errorRegisterPasswordTEasy").addClass("d-none");
	}
}
function passwordStrength(password)
{
	var strength = 0;
	var strength = 0;
	var strout = "";
	var populars = ["123","12345","321","54321","qwerty","asdfgh","zxcvbn"];
	if(password.match(/.*[A-ZА-Я]/) && password.match(/.*[a-zа-я]/))
	{
		console.log("[пароль]: разнообразный регистр");
		strength++;
	}
	else
	{	
		console.log("[пароль]: однообразный регистр");
		strength-1;
	}
	if(password.match(/.*[a-zA-Zа-яА-Я]/) && password.match(/.*[0-9]/))
	{
		console.log("[пароль]: альфанумерический");
		strength++;
	}
	else
	{	
		console.log("[пароль]: только цифры или только буквы");
		strength-1;
	}
	if(password.match(/[$-/:-?{-~!"^_`\[\]]/))
	{
		console.log("[пароль]: содержит символы");
		strength++;
	}
	else
	{	
		console.log("[пароль]: без символов");
		strength-1;
	}
	var incl = 0
	var qwerties = [];
	for(var p in populars)
	{
		if(password.includes(populars[p]))
		{
			incl++;
			qwerties.push(populars[p]);
		}
	}
	if(incl > 0)
	{
		strength-1;
		console.log("[пароль]: QWERTY-образный")
	}
	if(password.length >= 16)
	{
		strength++;
	}
	else
	{	
		strength-1;
	}
	if(password.length >= 8)
	{
		switch(strength)
		{
			case 1:
				strout = "Слабый";
				break;
			case 2:
				strout = "Средний";
				break;
			case 3:
				strout = "Сильный";
				break;
			case 4:
				strout = "Надёжный как швейцарские часы";
				break;
			default:
				strout = "Очень слабый";
				break;
		}
	}
	else
	{
		strout = "Ненадёжный";
	}
	if(qwerties.length > 0)
	{
		strout += " ("+qwerties[0]+")";
	}
	console.log("[пароль]: сложность: "+strength);
	console.log("[пароль]: "+strout);
	return {
		strength: strength,
		description: strout
	}
}
function authRegister(token)
{
	$("#registerUsername").attr("name","name");
	$("#registerPasswordA").attr("name","password");
	console.log('register..');
	//Сброс ошибок
	release();
	var clientsideValidation = true;
	var errors = [];

	var request = {
		token:    token,
		email:    $("#registerEmail").val(),
		username: $("#registerUsername").val(),
		password: $("#registerPasswordA").val()
	};

	if(1 > $("#registerUsername").val().length)
	{
		clientsideValidation = false;
		errors.push("register_username_is_null");
	}
	if($("#registerUsername").val().match(/^[A-Za-z0-9_]*$/) == null)
	{
		clientsideValidation = false;
		errors.push("register_unvalid_username");
	}
	if(1 > $("#registerEmail").val().length)
	{
		clientsideValidation = false;
		errors.push("register_email_is_null");
	}
	if($("#registerEmail").val().match(/^([A-Za-z0-9\_\-\.]{1,24}\@[A-Za-z0-9_-]{1,24}\.[A-Za-z]{2,3})$/) == null)
	{
		clientsideValidation = false;
		errors.push("register_unvalid_email");
	}
	if($("#registerPasswordA").val() == $("#registerUsername").val())
	{
		clientsideValidation = false;
		errors.push("register_password_too_easy");
	}
	if($("#registerPasswordA").val() == $("#registerEmail").val())
	{
		clientsideValidation = false;
		errors.push("register_password_too_easy");
	}
	if(1 > $("#registerUsername").val().length)
	{
		clientsideValidation = false;
		errors.push("register_username_is_null");
	}
	if(7 > $("#registerPasswordA").val().length)
	{
		clientsideValidation = false;
		errors.push("register_password_is_null");
	}
	if($("#registerPasswordA").val() != $("#registerPasswordB").val())
	{
		clientsideValidation = false;
		errors.push("register_password_mismatch");
	}
	if(2 > passwordStrength($("#registerPasswordA").val()).strength)
	{
		clientsideValidation = false;
		errors.push("register_password_too_easy");
	}
	if(clientsideValidation)
	{
		$.post('/register',request).done(function(backend)
		{
			console.log(backend);

			if (backend["status"] == "success")
			{
				window.location.href = "/download";
			}
			else
			{
				reports(backend["errors"]);
			}
		});
	}
	else
	{
		reports(errors);
	}
}
function authLogin()
{
	$("#authUsername").attr("name","name");
	$("#authPassword").attr("name","password");
	console.log('login..');
	//Сброс ошибок
	release();
	var clientsideValidation = true;
	var errors = [];

	var request = { 
		username: $("#authUsername").val(),
		password: $("#authPassword").val()
	};

	if(1 > $("#authUsername").val().length)
	{
		clientsideValidation = false;
		errors.push("username_is_null");
	}
	if(1 > $("#authPassword").val().length)
	{
		clientsideValidation = false;
		errors.push("password_is_null");
	}
	if(clientsideValidation)
	{
		$.post('/login',request).done(function(backend)
		{
			console.log(backend);

			if (backend["status"] == "success")
			{
				window.location.href = "/download";
			}
			else
			{
				reports(backend["errors"]);
			}
		});
	}
	else
	{
		reports(errors);
	}
}