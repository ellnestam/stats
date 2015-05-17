var fs = require ('fs');

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

    for_data : function (data, pattern, stats) {
	var lines = data.toString().split('\n');
	var response = [];
	for (var i = 0; i < lines.length; i++) {
	    var line = lines[i];
	    if (parse.contains(line, pattern) && parse.notContains(line, 'wip')) {
		var cols = line.split(/\s+/);
		var resource = cols[cols.length - 1];
		response.push(resource + ' (' + cols[0] + ')');
	    }
	}

	stats(response.join(', '));
    },
    
    notContains : function (str, substring) {
	return str.indexOf(substring) === -1;
    },

    contains : function (str, substring) {
	return str.indexOf(substring) > 0;
    }    
}

module.exports = parse;


