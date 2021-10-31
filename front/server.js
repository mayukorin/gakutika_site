var express = require("express");
var history = require("connect-history-api-fallback");

/// var path = require("path");
var serveStatic = require("serve-static");
app = express();
app.use(serveStatic(__dirname + "/dist"));
app.use(history());
app.get(/.*/, function (req, res) {
  res.sendFile(__dirname + "/dist/index.html");
});
var port = process.env.PORT || 8080;
app.listen(port);
console.log("server started " + port);
