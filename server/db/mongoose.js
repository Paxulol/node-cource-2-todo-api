const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_DB_URL);
// DB-url: mongodb+srv://dbUser:dbPass@testcluster-txlgh.mongodb.net/test?retryWrites=true

module.exports = {
  mongoose,
};
