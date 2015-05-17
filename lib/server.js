var http = require('http');
var fetch = require('./fetch');

var server = {

    launch : function launcher(args) {
	var cred = {'username' : args[2],
		    'password'  : args[3]};
	
	if (args.length < 3) {
	    console.log(" Usage: node server.js <username> <password>");
	} else {
	    console.log('Starting server');
	    var server = http.createServer(function (req, res) {
		res.writeHead(200, {'Content-Type': 'text/plain'});    
		fetch.request(function(message) {
		    var response = {'text' : message};
		    res.end(JSON.stringify(response) + '\n');
		}, cred);
	    });

	    return server;
	}
    }
};

var startServer = server.launch(process.argv);
startServer.listen(8080);

module.exports = server;


