var fetch = require('../lib/fetch');
var q = require('q');

var fetchTest = {

    test : function() {
	var cred = {'username' : 'b0363500',
		    'password' : 'H@mst3r!'};

	var promises = fetch.request(cred);
	promises.then(console.log, console.error);

	
	// fetch.prettyPrint(promises, fetch.summarize);
    },

    testSummarize : function() {
	var summary = [
	    {'generated'  : '01-May-2015 00:30 CEST',
	     'res'        :
	     [
		 {name : '/pod/avsnitt1.mp3', count : '13'},
		 {name : '/pod/avsnitt10.mp3', count : '6'},
		 {name: '/pod/avsnitt5.mp3', count : '2'}

	     ]
	    },

	    {'generated'  : '01-Jun-2015 00:30 CEST',
	     'res'        :
	     [
		 {name : '/pod/avsnitt1.mp3', count : '13'},
		 {name : '/pod/avsnitt10.mp3', count : '6'},
		 {name: '/pod/avsnitt5.mp3', count : '2'}
	     ]
	    }
	]; 

	var text = fetch.summarize(summary);
	console.log(text);
	
    }
    
    
}

// fetchTest.test();
fetchTest.testSummarize();

module.exports = fetchTest;
