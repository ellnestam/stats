var request = require('request');
var parse = require('./parse');

var stats = {

    request : function(messageCallback, cred) {
	console.log(cred);
	
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

	request.post(
	    'https://webstats.levonline.com/www.agical.se/url_201505.html',
	    {
		form: { key: 'value' },
		headers: header
	    },

	    function (error, response, body) {
		if (!error && response.statusCode == 200) {
		    parse.for_data(body, 'avsnitt', messageCallback);
		}
	    }
	);
    },
    
    stats : function(cols) {
	var resource = cols[cols.length - 1].trim();
	var views = cols[0].trim();
	console.log(resource, ':', views);
    }
    
};

// var launch = stats.launch(process.argv);

module.exports = stats;

