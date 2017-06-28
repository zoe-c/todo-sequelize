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


// you need to create a model that has name: item  attributes: {task: string, complete: boolean (T= complete// F= not complete: aka pending)
// because sequelizer constantly updates.. and adds a created at and completed time stamp... do i need to define an attribute for the status/ completed part?
//
// const item = models.Item.build({
//    task:'sleep',
//    status: 'f'
// });
// item.save().then(function(newItem) {
//    console.log(newItem.id);
// });
// const todo = models.Todo.build({
//   task: 'sleep',
//   status: 'incomplete'
// });

// todo.save().then(function(newTodo){
//    console.log(newTodo);
// });




app.get('/', function(req,res) {
   res.render('app')
});

app.post("/", function (req,res) {
   // req.checkBody('task','You forgot to enter a task! Please try again.').notEmpty();

   //Checking for validationErrors (you just set validation above== task must not be empty!)
   // var errors = req.validationErrors();
   //   if (errors) {
   //     res.send( "You forgot to enter a task! Go back and try again.");
   //   } else {
         // const addTask = {'task': req.body.task};
         const todo = models.Todo.build({
           task: req.body.task,
           status: 'incomplete'
         });

         todo.save().then(function(req, res, next){
            res.render('app', {'task': task});
            next();
         });


   // }
});


// NEED TO MOVE THE RENDER THE GET.
// ADD REDIRECT TO THE POST.
// ON RENDER: do similar to below and instead of console.log>> res.render
// models.Student.findAll().then(function(students){
//    console.log(students);
//    console.log('^Here are our students');
// })


// Port
app.listen(3000, function(){
  console.log('Started App!')
});
