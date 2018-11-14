const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

const data = {
  id: 10,
};

const token = jwt.sign(data, 'your-256-bit-secret');

console.log(token);

const decoded = jwt.verify(token, 'your-256-bit-secret');
console.log('Decoded', decoded);

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
