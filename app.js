var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended:false});

var app = express();

/* using sessions */
app.use(session({secret: 'todotopsecret'}))

/* no todo list in session create an empty one using this middleware */

app.use(function(req, res, next) {
    if(typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})

/* display todlist and form */

.get('/todo', function(req, res) {
    res.render('todo.ejs', {todolist: req.session.todolist});
})

/* add an item to todolist */

.post('/todo/add', urlencodedParser, function(req, res) {
    if(req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
})

/* delete todo item */

.get('/todo/delete/:id', function(req, res) {
    if(req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})

/* redirects to todolist if page requested not found */

.use(function(req, res, next) {
    res.redirect('/todo');
})

.listen(8080);