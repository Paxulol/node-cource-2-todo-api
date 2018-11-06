const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    //deleteMany
//    db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((res) => {
//        console.log(res);
//    });
    //deleteOne
//    db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((res) => {
//        console.log(res);
//    })
    //findOneAndDelete
//    db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
//        console.log(result.value);
//    })
//    client.close();

    db.collection('Users').deleteMany({name: 'Casper'}).then((res) => {
        console.log(res);
    });
    db.collection('Users').findOneAndDelete({_id: new ObjectID('5be1541c2bb2d04339bc3858')}).then((res) => {
        console.log(res.value);
    })
});