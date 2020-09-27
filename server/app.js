const http = require("http");
const express = require('express');
const ParseServer = require('parse-server').ParseServer;

const app = express();

const server = new ParseServer({
  databaseURI:
    "mongodb+srv://" +
    process.env.DB_USERNAME +
    ":" +
    process.env.DB_CRED +
    "@" +
    process.env.DB_HOST +
    "/" +
    process.env.APPNAME,
  cloud: __dirname + "/cloud/main.js",
  appId: process.env.PARSE_APP_ID,
  javascriptKey: process.env.PARSE_JAVASCRIPT_KEY,
  masterKey: process.env.PARSE_MASTER_KEY,
  fileKey: process.env.PARSE_FILE_KEY,
  restAPIKey: process.env.PARSE_REST_API_KEY,
  serverURL: "http://localhost:" + process.env.PORT + "/" + process.env.APPNAME,
});


// Serve the Parse server on the /appName URL prefix
app.use("/" + process.env.APPNAME, server);

const httpServer = http.createServer(app).listen(process.env.PORT);

console.log("RUNNING ON PORT : " + process.env.PORT);