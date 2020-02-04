const Post = require('../models/post');

module.exports = app => {
    // CREATE
    app.post("/posts/new", (req, res) => {
        const post = new Post(req.body);

        post.save((err, post) => {
            console.log(err);
            console.log(post);
            return res.redirect(`/`);
        })
    });
    app.get("/", (req, res) => {
        Post.find({})
            .then(posts => {
                res.render("posts-index", {
                    posts
                });
            })
            .catch(err => {
                console.log('error', err.message);
            });
    });
    app.get("/posts/:id", function (req, res) {
        // Display Post
        Post.findById(req.params.id)
            .then(post => {
                res.render("posts-show", {
                    post
                });
            })
            .catch(err => {
                console.log(err.message);
            });
    });

};