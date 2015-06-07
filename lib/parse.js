var fs = require ('fs');
var _  = require('lodash');

var parse = {

    for_file : function (file, pattern, stats) {
	fs.readFile(file, "utf-8", function (error, data) {	    
	    if (error) {
		console.log('Error', error);
	    } else {
		parse.for_data(data, pattern, stats);
	    }
	});
    },

    for_data : function (data, pattern) {
	var lines = data.toString().split('\n');

	var s = {};
	s.generated = 'Generated (N/A): ';
	var resources = {};
	
	for (var i = 0; i < lines.length; i++) {
	    var line = lines[i];

	    
	    if (parse.contains(line, pattern) && parse.notContains(line, 'wip')) {
		var cols = line.split(/\s+/);
		var resource = cols[cols.length - 1];
		resources[resource] = cols[0];
	    }

	    if (parse.startsWith('*** Generated: ', line.trim())) {
		s.generated = line.replace('<BR>', '');
	    }
	    
	    if (parse.startsWith('Generated', line.trim())) {
		s.generated = line.replace('<BR>', '');
	    }
	    

	}

	if (!_.isEmpty(resources)) {
	    s.res = resources;
	}
	
	return s;
    },

    startsWith : function(match, str) {
	return str.indexOf(match) === 0;
    },
    
    notContains : function (str, substring) {
	return str.indexOf(substring) === -1;
    },

    contains : function (str, substring) {
	return str.indexOf(substring) > 0;
    }    
}

module.exports = parse;


