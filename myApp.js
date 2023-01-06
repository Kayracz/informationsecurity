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
//This middleware sets the X-Download-Options header to noopen. This will prevent IE users from executing downloads in the trusted site’s context.
app.use(helmet.ieNoOpen());
//HTTP Strict Transport Security (HSTS) is a web security policy which helps to protect websites against protocol downgrade attacks and cookie hijacking.By setting the header Strict-Transport-Security, you tell the browsers to use HTTPS for the future requests in a specified amount of time. 
ninetyDaysInSeconds = 90*24*60*60;
app.use(helmet.hsts({maxAge: ninetyDaysInSeconds, force: true}));
// If you have high security needs you can disable DNS prefetching, at the cost of a performance penalty.
app.use(helmet.dnsPrefetchControl());
//If you are releasing an update for your website, and you want the users to always download the newer version, you can (try to) disable caching on client’s browser. It can be useful in development too. Caching has performance benefits, which you will lose, so only use this option when there is a real need.
app.use(helmet.noCache());
//By setting and configuring a Content Security Policy you can prevent the injection of anything unintended into your page. This will protect your app from XSS vulnerabilities, undesired tracking, malicious frames, and much more.
app.use(helmet.contentSecurityPolicy({ directives: { defaultSrc: ["'self'"], scriptSrc: ["'self'", "trusted-cdn.com"] }} )) 







































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
