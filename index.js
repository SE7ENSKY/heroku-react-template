const express = require("express");
const path = require("path");
const compression = require("compression");
const cors = require("cors");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(compression({ threshold: 1024 }));
app.use(cors());

app.get('/*', function (req, res, next) {
	if (req.url.indexOf("/assets/") === 0) {
		res.setHeader("Cache-Control", "public, max-age=2592000");
		res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
	}
	next();
});

app.use(express.static(__dirname + '/public'));

app.use((req, res) => {
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

app.listen(app.get('port'), () => {
	console.log('Node app is running on port ' + app.get('port'));
});
