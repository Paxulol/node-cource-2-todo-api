const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/Todo');
const {User} = require('./../models/User');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);
describe('TODOS', () => {
  describe('POST /todos', () => {
    it('should create a new todo', (done) => {
      const text = 'Test todo text';

      request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
          expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          Todo.find({text}).then((todos) => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          }).catch((e) => done(e));
        });
    });

    it('should not create todo with invalid body data', (done) => {
      request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          Todo.find().then((todos) => {
            expect(todos.length).toBe(3);
            done();
          }).catch((e) => done(e));
        });
    });
  });

  describe('GET /todos', () => {
    it('should get all todos', (done) => {
      request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
          expect(res.body.todos.length).toBe(3);
        })
        .end(done);
    });
  });

  describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
      request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });
    it('should return 404 if todo not found', (done) => {
      request(app)
        .get(`/todos/${new ObjectID().toHexString()}`)
        .expect(404)
        .end(done);
    });
    it('should return 404 for non-object id', (done) => {
      request(app)
        .get(`/todos/123abc`)
        .expect(404)
        .end(done);
    });
  });

  describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
      const hexId = todos[0]._id.toHexString();

      request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.todo._id).toBe(hexId);
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          Todo.findById(hexId).then((todo) => {
            expect(todo).toBeFalsy();
            done();
          }).catch((err) => {
            done(err);
          })
        })
    });

    it('should return 404 if todo not found', (done) => {
      request(app)
        .delete(`/todos/123abc`)
        .expect(404)
        .end(done);
    });

    it('should return 404 if objectId is invalid', (done) => {
      request(app)
        .delete(`/todos/123abc`)
        .expect(404)
        .end(done);
    });
  });

  describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
      const todo = todos[0];
      const changeText = 'Hey du!';

      request(app)
        .patch(`/todos/${todo._id}`)
        .send({text: changeText, completed: true})
        .expect(200)
        .expect((res) => {
          expect(res.body.todo.text).toBe(changeText);
          expect(res.body.todo.completed).toBe(true);
          expect(typeof res.body.todo.completedAt).toBe('number');
        })
        .end(done)
    });

    it('should clear completedAt when todo is not completed', (done) => {
      const todo = todos[1];
      const changeText = 'Hey du!';

      request(app)
        .patch(`/todos/${todo._id}`)
        .send({completed: false, text: changeText})
        .expect(200)
        .expect((res) => {

          expect(res.body.todo.completed).toBe(false);
          expect(res.body.todo.text).toBe(changeText);
          expect(res.body.todo.completedAt).toBeFalsy();
        })
        .end(done);
    });
  });
});

describe('USERS', () => {
  describe('GET /users/me', () => {
    it('should return user if authenticated', (done) => {
      request(app)
        .get('/users/me')
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .expect((res) => {
          expect(res.body._id).toBe(users[0]._id.toString());
          expect(res.body.email).toBe(users[0].email)
        })
        .end(done);
    });

    it('should return a 401 if not authenticated', (done) => {
      request(app)
        .get(`/users/me`)
        .expect(401)
        .expect((res) => {
          expect(res.body).toEqual({});
        })
        .end(done);
    });
  });
  
  describe('POST /users', () => {
    it('should create a user', (done) => {
      let email = 'abc@abs.dk';
      let password = 'password123';

      request(app)
        .post('/users')
        .send({email, password})
        .expect(200)
        .expect((res) => {
            expect(res.headers['x-auth']).toBeTruthy();
            expect(res.body._id).toBeTruthy();
            expect(res.body.email).toBe(email);
        })
        .end((err) => {
            if (err) return done(err);

            User.findOne({email}).then((user) => {
                expect(user).toBeTruthy();
                expect(user.email).toBe(email);
                done();
            })
        });
    });

    it('should return validation error if request invalid', (done) => {
      const email = 'test';
      const password = 'test';

      request(app)
        .post('/users')
        .send({email, password})
        .expect(400)
        .expect((res) => {
            expect(res.body.name).toBe('ValidationError');
        })
        .end(done);
    });

    it('should not create user if email in use', (done) => {
      const email = users[0].email;

      request(app)
        .post('/users')
        .send({email, password: 'Test123abc'})
        .expect(400)
        .expect((res) => {
            expect(res.body.name).toBe('MongoError');
            expect(res.body.code).toBe(11000);
        })
        .end(done)
    });
  })
});
