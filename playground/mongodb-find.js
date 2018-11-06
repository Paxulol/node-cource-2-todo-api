const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

//    db.collection('Todos').find({
//        _id: new ObjectID('5be1574cc5b3bb93203bd7a6')
//    }).toArray().then((docs) => {
//        console.log('Todos');
//        console.log(JSON.stringify(docs, undefined, 2));
//    }, (err) => {
//        console.log('unable to fetch Todos', err);
//    });

//    db.collection('Todos').find().count().then((count) => {
//        console.log(`Todos count ${count}`);
//
//    }, (err) => {
//        console.log('unable to fetch Todos', err);
//    });

    db.collection('Users').find({name: 'Casper'}).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log(err);
    });

    client.close();
});