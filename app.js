const express = require('express');
const app = express();
const models = require('./models');
const bodyParser= require('body-parser');
const mustacheExpress = require('mustache-express');

// Views
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');


// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(expressValidator());


// Requests
app.get('/', function(req,res) {
   models.Todo.findAll().then(function(todos){
      res.render('app', {Todo: todos});
   });
});

app.post("/", function (req,res) {
         const todo = models.Todo.build({
           task: req.body.task,
           status: 'incomplete'
         });

         todo.save().then(function(req, res, next){

            next();
         });
         res.redirect('/');
});

// Port
app.listen(3000, function(){
  console.log('Started App!')
});
