var fetch = require('../lib/fetch');
var q = require('q');

var fetchTest = {

    test : function() {
	var cred = {'username' : 'b0363500',
		    'password' : 'H@mst3r!'};

	var promises = fetch.request(cred);
	fetch.prettyPrint(promises, fetch.summarize);
    }
}

fetchTest.test();

module.exports = fetchTest;
