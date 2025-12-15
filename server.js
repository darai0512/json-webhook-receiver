var express = require('express')
var app = express()
app.use(express.json())

app.get('/error', function (req, res) {
  console.log(req.method, '/error', JSON.stringify(req.headers))
  res.sendStatus(400)
});
app.post('/error', function (req, res) {
  console.log(req.method, '/error', JSON.stringify(req.headers))
  console.log(req.method, '/error', JSON.stringify(req.body))
  res.sendStatus(400)
});
// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.all('*', function (request, response) {
  console.log(request.method, request.path, JSON.stringify(request.headers))
  if (request.body && Object.keys(request.body).length > 0) {
    console.log(request.method, request.path, JSON.stringify(request.body));
  }
  response.sendStatus(200)
});
app.use(function (req, res, next) {
  console.log('/', JSON.stringify(request.headers))
  console.log('/error', JSON.stringify(request.body))
  res.status(404).json({})
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
