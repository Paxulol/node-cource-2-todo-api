const env = process.env.NODE_ENV || 'development';
console.log('env ******* ', env);

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGO_DB_URL = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGO_DB_URL = 'mongodb://localhost:27017/TodoAppTest';
}
