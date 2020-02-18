const express = require("express");
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();


const port = 3000;
require('dotenv').config();

const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");

app.use(cookieParser()); // Add this after you initialize express.




// Use Body Parser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// Add after body parser initialization!
app.use(expressValidator());

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// set db
require("./data/reddit-db");



// Checks Authentication 
var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, {
      complete: true
    }) || {};
    req.user = decodedToken.payload;
  }

  next();
};
app.use(checkAuth);


// app.get('/', (req, res) => res.render('posts-index'))
app.get("/posts/new", (req, res) => {
  var currentUser = req.user;
  console.log(currentUser);
  res.render("posts-new", {
    currentUser
  });
});

//Controllers
require("./controllers/posts")(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;