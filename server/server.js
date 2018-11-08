let express = require('express');
let bodyParser = require('body-parser');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/Todo');
let {User} = require('./models/User');

let app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (error) => {
        res.status(400).send(error);
    })
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) =>{
        res.send({todos})
    }, (error) => {
        res.status(400).send(error);
    })
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app};