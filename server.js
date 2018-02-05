var bodyParser = require('body-parser')
var express = require('express');
var app = express();

app.use(bodyParser.json())

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/", function (request, response) {
  console.log(request.body);
  response.sendStatus(200);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
