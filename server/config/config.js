const env = process.env.NODE_ENV || 'development';
console.log('env ******* ', env);

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGO_DB_URL = 'mongodb://127.0.0.1:27017/TodoAppTest';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGO_DB_URL = 'mongodb://127.0.0.1:27017/TodoAppTest';
}
