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

	console.log('Trying to fetch stats');

	var dateObj = new Date();
	var month = stats.zeroFill(dateObj.getUTCMonth() + 1, 2);
	var year = dateObj.getFullYear();

	request.post('https://webstats.levonline.com/www.agical.se/url_' + year + month + '.html',
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
    },

    zeroFill : function (number, size) {
	number = number.toString();
	while (number.length < size) {
	    number = "0" + number;
	}
	return number;
    }
};

module.exports = stats;

