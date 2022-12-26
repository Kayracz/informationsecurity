const express = require('express');
const app = express();
const helmet = require('helmet');


//Hackers can exploit known vulnerabilities in Express/Node if they see that your site is powered by Express.Use the helmet.hidePoweredBy() middleware to remove the X-Powered-By header.
 app.use(helmet.hidePoweredBy());
//miitages risk of clickjacking. Your page could be put in a <frame> or <iframe> without your consent. This can result in clickjacking attacks, among other things. Clickjacking is a technique of tricking a user into interacting with a page different from what the user thinks it is.In that context a hacker can put a hidden layer over your page. Hidden buttons can be used to run bad scripts. This middleware sets the X-Frame-Options header. It restricts who can put your site in a frame. It has three modes: DENY, SAMEORIGIN, and ALLOW-FROM.
 app.use(helmet.frameguard({action: 'deny'}));
//miitages risk of cross site scripting. Cross-site scripting (XSS) is a frequent type of attack where malicious scripts are injected into vulnerable pages, with the purpose of stealing sensitive data like session cookies, or passwords.The basic rule to lower the risk of an XSS attack is simple: “Never trust user’s input” The X-XSS-Protection HTTP header is a basic protection.
 app.use(helmet.xssFilter());
//This middleware sets the X-Content-Type-Options header to nosniff, instructing the browser to not bypass the provided Content-Type.
 app.use(helmet.noSniff());







































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
