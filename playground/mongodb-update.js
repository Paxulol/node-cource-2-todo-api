const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // findOneAndUpdate
//    db.collection('Todos').findOneAndUpdate({
//        _id: new ObjectID('5be16841c5b3bb93203bdc8f')
//    }, {
//        $set: {
//            completed: true
//        }
//    }, {
//        returnOriginal: false
//    }).then((res) => {
//        console.log(res);
//    })

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5be152f085331c419052e3de')
    }, {
        $set: {
            name: "Casper"
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((res) => {
        console.log(res);
    })
});