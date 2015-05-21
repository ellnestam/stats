var fetch = require('../lib/fetch');


var fetchTest = {

    test : function() {
	var cred = {'username' : 'b0363500',
		    'password' : 'H@mst3r!'};

	fetch.request(console.log, cred);
    }
}

fetchTest.test();

module.exports = fetchTest;
