/*jshint node:true*/

// app.js
// This file contains the server side JavaScript code for your application.
// This sample application uses express as web application framework (http://expressjs.com/),
// and jade as template engine (http://jade-lang.com/).

var express = require('express');
var bodyParser = require('body-parser');
//var userDBFile = require('./UserInfo');

var userDB = {'user1':'pwd1', 'user2':'pwd2'};
//var userDB = userDBFile.userDB;

var beconInfo = {
	'beacon1':{'location': 'Library Entrance'},	
	'beacon2':{'location': 'Graduate commons'},
	'beacon3':{'location': 'Faculty commons'},
	'beacon4':{'location': 'Visualization lab'}
};

var beacons = {
	'c48c6716193f477bb73ac550ce582a2203e800c0':'beacon1', //192
	'c48c6716193f477bb73ac550ce582a2203e800d8':'beacon2', //216
	'c48c6716193f477bb73ac550ce582a2203e80186':'beacon3' //390
}

var userBeacons = {};

var userBeconMapping = [];

// setup middleware
var app = express();

app.use(bodyParser.json()); 	// for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(app.router);
//app.use(express.errorHandler());
app.use(express.static(__dirname + '/public')); //setup static public directory
app.set('view engine', 'jade');
app.set('views', __dirname + '/views'); //optional since express defaults to CWD/views




app.set('title', 'IoT Application');
app.get('title');

// render index page
app.get('/', function(req, res){
	res.render('index');
});

app.get('/dashboard', function(req, res){
	var bkonData = new Array();
	
	for(key1 in userBeconMapping) {
		var userData = userBeconMapping[key1];
		var maxRSSI = -99999;
		var minKey = 0;
		console.log('userData');
		console.log(userData);
		for(key in userData) {
			if(maxRSSI < userData[key]) {
				maxRSSI = userData[key];
				minKey = key;
			}	
		}
		
		var messageToSend = "";
		
		if(beacons[minKey]) {
			messageToSend = beconInfo[beacons[minKey]];
		}
		
		bkonData.push({key: key1, message:messageToSend});
//		bkonData[key1] = messageToSend;
	}
	
	console.log(bkonData);
	res.render('dashboard', {bkondata: bkonData});
});

//render update node info page
app.get('/UpdateNode', function(req, res){
	var bkonData = new Array();
	
	for(key1 in beacons) {
		//key = c48c6716193f477bb73ac550ce582a2203e80171
		var nameOfBecon = beacons[key1];		//nameMessageMapping = beacon1
		var messageToSend = beconInfo[nameOfBecon].location;	//messageToSend = You are at library entrance
		
		
		
		bkonData.push({key: key1, information:{beconName:nameOfBecon, message:messageToSend}});
		//console.log("mama = " + bkonData[key1]);
		//console.log(bkonData[key1]);
//		bkonData[key1] = messageToSend;
	}
	
	//console.log(bkonData);
		res.render('UpdateNode', {bkondata: bkonData});
});



function eraseData() {
	
	console.log(userBeconMapping);
	
	console.log('Erasing Data');
	userBeconMapping = {};	

	setTimeout(eraseData, 5000);
}

//eraseData();

app.post('/login', function(req, res){
	console.log("In post method " + req.body);
  	//res.json(req.body);
  	if(req.body)
  	{
  		if (req.body.userID)
	  	{
	  		//console.log(req.body.userID);
	  		//console.log(userDB[req.body.userID]);
		  	if (req.body.password == userDB[req.body.userID])
		  		res.send('Login successful');
		  	else
		  		res.status(403).send('Login error');	
	  	}
	  	else
	  	{
	  		res.status(403).send('Login error');
	  	} 

  	}
	else
  	{
  		res.status(403).send('Login error');
  	} 	
  	  	
});


app.post('/UpdateNode', function(req, res){
	console.log("In post of UpdateNode " + req.body);
  	//res.json(req.body);
  	if(req.body)
  	{
  		
  		//var userIDFromRequest = req.body.userID;
  		//var passwordFromRequest = req.body.password;
  	  	//var newValueOfBecon = req.body.newValueOfBecon;
  	  	var beconName = req.body.txtBeconName;
  	  	var beconId = req.body.txtBeconId;
  	  	var locationMsg = req.body.txtCustomMessage;

  	  	/*
  	  	if(!userDB[req.body.userID] || userDB[req.body.userID] !== passwordFromRequest)
  		{
  			console.log("Error in log in");
  			res.send('Login error');
  			return;
  		}
  		*/

  		if(!beconName ||
  			!beconId ||
  			!locationMsg){
  			 	//console.log(beconName + " " + beconId + " " + locationMsg);
  				console.log('Invalid Beacon info.');
  				//res.status(403).send();
  				res.redirect('UpdateNode');
  				return;  				
  		}

  		//add new item or update existing item in dictionary.
  		beacons[beconId] = beconName;
  		beconInfo[beconName] = {};
  		beconInfo[beconName]["location"] = locationMsg;
  		//console.log(beacons);
  		//console.log(beconInfo);
  		//res.send("Becon updated");
  		//document.alert("Becon updated");
  		res.redirect('UpdateNode');
  	}
  	else
  	{
  		res.status(404).send('Bad Request');
  	}  	
});

app.post('/DeleteNode', function(req, res){
	console.log("In post of DeleteNode " + req.body);
  	//res.json(req.body);
  	if(req.body)
  	{
  		
  		//var userIDFromRequest = req.body.userID;
  		//var passwordFromRequest = req.body.password;
  	  	//var newValueOfBecon = req.body.newValueOfBecon;
  	  	var beconName = req.body.txtBeconName;
  	  	var beconId = req.body.txtBeconId;
  	  	var locationMsg = req.body.txtCustomMessage;

  	  	/*
  	  	if(!userDB[req.body.userID] || userDB[req.body.userID] !== passwordFromRequest)
  		{
  			console.log("Error in log in");
  			res.send('Login error');
  			return;
  		}
  		*/

  		if(!beconName ||
  			!beconId){
  			 	console.log(beconName + " " + beconId + " " + locationMsg);
  				console.log('Invalid Becon info.');
  				//res.status(403).send();
  				res.redirect('UpdateNode');
  				return;  				
  		}

  		//remove item from dictionary.
  		//beacons.remove(beconId);
  		delete beacons[beconId];
  		//beconInfo.remove(beconName);
  		delete beconInfo[beconName];

  		//beacons[beconId] = beconName;
  		//beconInfo[beconName] = {};
  		//beconInfo[beconName]["location"] = locationMsg;
  		//console.log(beacons);
  		//console.log(beconInfo);
  		//res.send("Becon updated");
  		//document.alert("Becon updated");
  		res.redirect('UpdateNode');
  	}
  	else
  	{
  		res.status(404).send('Bad Request');
  	}  	
});


//Function that will give the message to person depending on becon id 
app.post('/sendstatus', function(req, res){
	//console.log("In post method of sendstatus " + req.body);
//  	console.log(req.body);
  	if(req.body)
  	{
  		var userIDFromRequest = req.body.userID;
  		var passwordFromRequest = req.body.password;
  		var beconInfoFromRequst = req.body.beconInfoList;
 // 		console.log(userIDFromRequest);
//  		console.log(beconInfoFromRequst);
  		if(!userDB[req.body.userID] || userDB[req.body.userID] !== passwordFromRequest)
  		{
  			console.log("Error in log in");
  			res.send('Login error');
  			return;
  		}

  		//logic to get the most powerful becon from the beconinfolist
  		var selectedBecon, selectedBeconStrength = -100;
		for( key in beconInfoFromRequst)
  		{
  			if(beconInfoFromRequst.hasOwnProperty(key))
  			{
  				//console.log(key);
  				if(!(beacons[key])) {
  					/*
	  				console.log('This is not our beacon');
  					res.status(403).send();
  					return;
  					*/
  					continue;
  				}
//  				console.log(beacons[key]);
//  				console.log(beconInfoFromRequst[key]);
  				if(userBeconMapping[userIDFromRequest]) {
					userBeconMapping[userIDFromRequest] = new Object();
 				} else {
					userBeconMapping[userIDFromRequest] = new Object();
  				}			
				userBeconMapping[userIDFromRequest][key] = beconInfoFromRequst[key];
  			}
  		}

		var userData = userBeconMapping[userIDFromRequest];
		console.log('User Data');
		console.log(userData);
		var maxRSSI = -99999;
		var minKey = 0;
		var minRSSI = 0;
		for(key in userData) {
			if(minKey == 0){
					minRSSI = userData[key];
					minKey = key;
			}
				
			//console.log('minimum = ' + minKey + " userData[key] = " + userData[key]);
			if(maxRSSI < userData[key] && minRSSI < userData[key]) {
				minKey = key;
				minRSSI = userData[key];
			}	
		}
		
		//console.log('minimum = ' + minKey);
		
		
		var messageToSend = "";
		
		if(beacons[minKey]) {
			messageToSend = beconInfo[beacons[minKey]];
		}
		
//		console.log(messageToSend);

		res.send(messageToSend);    			

  	}
	else
  	{
  		res.status(404).send('Bad Request');
  	}  	  	
});



// There are many useful environment variables available in process.env.
// VCAP_APPLICATION contains useful information about a deployed application.
var appInfo = JSON.parse(process.env.VCAP_APPLICATION || "{}");
// TODO: Get application information and use it in your app.

// VCAP_SERVICES contains all the credentials of services bound to
// this application. For details of its content, please refer to
// the document or sample of each service.
var services = JSON.parse(process.env.VCAP_SERVICES || "{}");
// TODO: Get service credentials and communicate with bluemix services.

// The IP address of the Cloud Foundry DEA (Droplet Execution Agent) that hosts this application:
var host = (process.env.VCAP_APP_HOST || 'localhost');
// The port on the DEA for communication with the application:
var port = (process.env.VCAP_APP_PORT || 3000);
// Start server
app.listen(port, host);
console.log('App started on port ' + port);

