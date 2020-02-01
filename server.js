var express = require('express');
var exphbs = require('express-handlebars');

var app = express();
require('./controllers/posts.js')(app);

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/posts/new', function (rew, res) {
    res.render('posts-new');
})

app.listen(3000);