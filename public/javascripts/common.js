function UpdateButton(id, name, message){

	console.log("Inside update button method");
	var txtBeconName = document.getElementById('txtBeconName');
	txtBeconName.value = name;

	var txtBeconId = document.getElementById('txtBeconId');
	txtBeconId.value = id;
//	txtBeconId.setAttribute('readonly', 'readonly'); 

	var txtCustomMessage = document.getElementById('txtCustomMessage');
	txtCustomMessage.value = message;

	document.form1.action = "/DeleteNode";
	//form(name="DeleteNode", action="/DeleteNode", method="post")
}

function clearText(){

	var txtBeconName = document.getElementById('txtBeconName');
	txtBeconName.value = "";

	var txtBeconId = document.getElementById('txtBeconId');
	txtBeconId.value = "";
	txtBeconId.removeAttribute('readonly');

	var txtCustomMessage = document.getElementById('txtCustomMessage');
	txtCustomMessage.value = "";

}

function beforeSubmit(){

	
	var txtBeconName = document.getElementById('txtBeconName');
	var txtBeconId = document.getElementById('txtBeconId');
	var txtCustomMessage = document.getElementById('txtCustomMessage');

	if(txtBeconName.value == "" || txtBeconId.value == "" || txtCustomMessage.value == "")
		alert("All the textbox values are required for add/update");

	document.form1.action = "/updateNode";
	
	return false;

}