const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = '123abc!';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
//        console.log(hash);
    })
});

let hashedPassword = '$2a$10$G4b3f1zfGHqhd/kfTBTIWuAZpL.kQA/DQuC3SWOQS/7o5IfRO4F9G';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});


//const data = {
//  id: 10,
//};
//
//const token = jwt.sign(data, 'your-256-bit-secret');
//
//console.log(token);
//
//const decoded = jwt.verify(token, 'your-256-bit-secret');
//console.log('Decoded', decoded);

// const message = 'I am user number 4';
// const hash = SHA256(message).toString();
//
// console.log(message);
// console.log(hash);

// const data = {
//  id: 4,
// };
// const token = {
//  data,
//  hash: SHA256(JSON.stringify(data) + 'somesecret').toString(),
// };
//
//
// const resultHash = SHA256(JSON.stringify(token.data) +'somesecret').toString();
//
// if (resultHash === token.hash) {
//  console.log('Data not changed');
// } else {
//  console.log('Data was changed');
// }
