var request = require('request');
var parse = require('./parse');
var q = require('q');

var stats = {

    request : function(cred) {
	var username = cred.username; 
	var password = cred.password;
	var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
	
	var header = {'Host': 'webstats.levonline.com', 'Authorization': auth};
	
	var options = {
	    hostname: 'webstats.levonline.com',
	    port: 80,
	    method: 'GET',
	};

	console.log('Trying to fetch stats');

	var urls = [];
	var dateObj = new Date();
	dateObj.setMonth(dateObj.getMonth() - 11);
	
	for (var i = 0; i < 12; i++) {
	    var month = stats.zeroFill(dateObj.getUTCMonth() + 1, 2);
	    var year = dateObj.getFullYear();
	    var url = 'https://webstats.levonline.com/www.agical.se/url_' + year + month + '.html';
	    urls.push(url);
	    dateObj.setMonth(dateObj.getMonth() + 1);
	}

	var promises = [];
	
	for (var i = 0; i < urls.length; i++) {
	    var statsUrl = urls[i];
	    var p = stats.requestData(urls[i], header);
	    promises.push(p);
	}
	
	return q.all(promises);
	
    },

    prettyPrint : function(promises, summarize) {
	promises.then(summarize, console.log);
    },

    
    summarize : function(data) {
	var text = '';
	for (var i = 0; i < data.length; i++) {
	    var res = data[i];
	    if (res.res) {
		text += res.generated + ' ';
		var resources = res.res;
		// Sortera?
		for (var r in resources) {
		    var num = resources[r];
		    text += r + ' (' + num + ') ';
		}
		text.trim();
		text += '\n';
	    }

	}

	return text;
    },
    
    requestData : function(url, header) {
	var deferred = q.defer();
	
	request.post(url,
		     {headers: header},
		     
		     function (error, response, body) {
			 if (!error && response.statusCode == 200) {
			     var message = parse.for_data(body, 'avsnitt');
			     deferred.resolve(message);
			 }

			 if (error || response.statusCode != 200) {
			     deferred.reject(new Error('Could not contact server ' + response.statusCode));
			 }
		     });

	return deferred.promise;
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

