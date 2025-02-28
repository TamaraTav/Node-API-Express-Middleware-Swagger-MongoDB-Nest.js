// console.log("hello world")
import fs from 'fs';

// const fs = require('fs');
//fs=file system


//Blocking code
const data = fs.readFileSync('data.txt','utf8');
console.log(data);

console.log('Reading data');

//Non-blocking code ასინქრონული
fs.readFile('data.txt','utf8',(err,data) => {
    console.log(data);
})


fs.readFile('message.txt','utf8',(err,data) => {
    console.log(data);
})