var request = require('request');
var parse = require('./parse');

var stats = {

    request : function(messageCallback, cred) {
	var username = cred.username; 
	var password = cred.password;
	var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
	
	var header = {'Host': 'webstats.levonline.com', 'Authorization': auth};
	
	var options = {
	    hostname: 'webstats.levonline.com',
	    port: 80,
	    method: 'GET',
	};

	var request = require('request');

	console.log('trying to fetch stats');
	
	request.post('https://webstats.levonline.com/www.agical.se/url_201505.html',
		     {headers: header},
		     
		     function (error, response, body) {
			 if (!error && response.statusCode == 200) {
			     parse.for_data(body, 'avsnitt', messageCallback);
			 }
			 
			 if (error) {
			     console.log(error);
			 }
			 
			 console.log('Response ' + response.statusCode);
		     });
    }
};

module.exports = stats;

