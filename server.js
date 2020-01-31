// Require Libraries
const express = require('express')

const app = express()
const exphbs = require('express-handlebars');

const port = 3000



app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/posts/new', (req, res) => {
    res.render('posts-new');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))