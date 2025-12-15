var express = require('express')
var app = express()
var apple = require('fs').readFileSync('./.well-known/apple-developer-merchantid-domain-association', 'UTF-8').trim()
app.use(express.json())

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.get("/", function (request, response) {
  console.log('/', JSON.stringify(request.headers))
  response.status(200).send('{}')
});
app.post("/", function (request, response) {
  console.log('/', JSON.stringify(request.headers))
  console.log('/', JSON.stringify(request.body));   //response.set('Transfer-Encoding', 'chunked')
  response.sendStatus(200)
});
app.post("/error", function (request, res) {
  console.log('/error', JSON.stringify(request.body))
  res.sendStatus(400);
});

app.get("/.well-known/apple-developer-merchantid-domain-association", function (request, response) {
  // console.log('/get_well_known', apple);
  response.set({
    'Content-Type': 'binary/octet-stream', // 'application/octet-stream',
    'Content-Length': apple.length,
    'via': '1.1 3dc52e38c13bcdac2f63985b834fed7a.cloudfront.net (CloudFront)',
  })
  response.status(200).send(apple);
});

app.use(function (req, res, next) {
  res.status(503).json({
    error: {
      "code": "under_maintenance",
      "message": "503",
      "status": 503,
      "type": "server_error"
    }
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
