var path = require('path');
var dotEnvPath = path.resolve('./.env');
require('dotenv').config({ path: dotEnvPath});

var SlackBot = require('slackbots');

// create a bot 
var bot = new SlackBot({
    token: process.env.TOKEN, // Add a bot https://my.slack.com/services/new/bot and put the token  
    name: 'Health Bot'
});
 
bot.on('start', function() {
    // more information about additional params https://api.slack.com/methods/chat.postMessage 
    var params = {
    	icon_emoji: ':heart:'
    };
    
    // define channel, where bot exist. You can adjust it there https://my.slack.com/services  
    bot.postMessageToChannel('testbot', 'Howdy, you can check the wait time at your local Minute Clinic by texting me your zip code.', params);
});

bot.on('message', function(data) {
	var params = {
    	icon_emoji: ':heart:'
    };

    // Zip codes and store IDs for clinics
    var clinics = [{
	    "02138": "1022", // Cambridge White Street
	    "02140": "717", // Cambridge Alewife 
	    "02155": "1010", // Medford
	    "02472": "1018", // Watertown
	    "02461": "6505" // Newton
	}];

    console.log(data);
    var stopMessage = true;
    var success = false;

    // Listens or believes someone may be sick and others them a tip to get better.
    if (data.text === "sick" && stopMessage) {
        bot.postMessage(data.channel, 'Stay home and rest up <@' + data.user + '> ! \nDrinking lots of water will help. Try drinking eight 8-ounce glasses today.');
        stopMessage = false;
    };

    // Request wait time at local minute clinic.
    if (data.text.substr(0, 12) === "<@U0Q4TCJCB>" && stopMessage) {
        console.log("Message has been sent to Health Bot");
	    var currentChannel = data.channel;

        if (data.text.substr(14, 18) === "02138") {
        	console.log(clinics[0]["02138"]);
        	var enteredZip = data.text.substr(14, 18);
        	success = true;
        } else if (data.text.substr(14, 18) === "02140") {
        	console.log(clinics[0]["02140"]);
        	var enteredZip = data.text.substr(14, 18);
        	success = true;
        } else if (data.text.substr(14, 18) === "02155") {
        	console.log(clinics[0]["02155"]);
        	var enteredZip = data.text.substr(14, 18);
        	success = true;
        } else if (data.text.substr(14, 18) === "02472") {
        	console.log(clinics[0]["02472"]);
        	var enteredZip = data.text.substr(14, 18);
        	success = true;
        } else if (data.text.substr(14, 18) === "02461") {
        	console.log(clinics[0]["02461"]);
        	var enteredZip = data.text.substr(14, 18);
        	success = true;
        } else {
	        bot.postMessage(data.channel, 'Oopsies. We can only accept zip codes for Cambridge(02138, 02140), Medford(02155), Watertown(02472), and Newton(02461). Try one of those for now.');
        };

        if (success) {
	        bot.postMessage(data.channel, '18 minute wait time at ' + enteredZip + ': http://www.cvs.com/minuteclinic/clinic-locator/clinicdetails.jsp?storeId=' + clinics[0][enteredZip]);
			success = false;
		};
        stopMessage = false;
    };

});