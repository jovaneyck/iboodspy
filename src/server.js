var express = require('express');
var fs = require('fs');

var Logger = {
	log: function(req, res){
		var timestamp = req.body.timestamp;
		var offer = req.body.offer;

		var delimiter="$";
		var stringToLog = timestamp+delimiter+offer.short_name+delimiter+offer.price.string;

		fs.appendFile('log.txt', stringToLog+"\n", function (err) {
			if (err) throw err;
		});

	  	res.end();
	}
};

var app = express();

app.use(express.bodyParser());

app.post('/log', function(req, res){
	Logger.log(req, res);
});

/* serves all the static files */
app.get(/^(.+)$/, function(req, res){ 
 res.sendfile( __dirname + req.params[0]); 
});

var portNumber = 3000;
app.listen(portNumber);
console.log('Logger listening on port '+portNumber);