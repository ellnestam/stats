var http = require('http');
var fetch = require('./fetch');

var server = {

    launch : function launcher(args) {
	var cred = {'username' : process.env.user,
		    'password'  : process.env.pwd};

	console.log('Starting server');
	var server = http.createServer(function (req, res) {
	    res.writeHead(200, {'Content-Type': 'text/plain'});    
	    var defered = fetch.request(cred);

	    defered.then(
		function(value) {
		    var text = fetch.summarize(value);
		    var response = {'text' : text};
		    res.end(JSON.stringify(response) + '\n');
		},
		function(reason) {
		    var response = {'text' : reason + ''};
		    res.end(JSON.stringify(response) + '\n');
		}
	    );
	    

	});
	
	return server;
    }
};

var startServer = server.launch(process.argv);
startServer.listen(process.env.PORT || 8080);

module.exports = server;
