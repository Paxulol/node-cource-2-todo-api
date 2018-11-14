const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/Todo');
const {User} = require('./../server/models/User');

let id = '5be177817fa111747141a9dc';

User.findById(id).then((user) => {
    if (!user){
        return console.log('User not found');
    }
    console.log(JSON.stringify(user, undefined, 2));
}).catch((err) => {
    console.log(err);
});

//let id = '5be43c8a9f9349bbda16300b11';
//
//if (!ObjectID.isValid(id)){
//    console.log('ID not valid');
//}

//Todo.find({
//    _id: id
//}).then((todos) => {
//    console.log('Todos', todos);
//});
//
//Todo.findOne({
//    _id: id
//}).then((todo) => {
//    console.log('Todo', todo);
//});

//Todo.findById(id).then((todo) => {
//    if (!todo){
//        return console.log('Id not found');
//    }
//    console.log('Todo', todo);
//}).catch((err) => {
//    console.log('Upsii');
//});
