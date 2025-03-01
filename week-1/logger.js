const error = 'ERROR';
const info = 'INFO';
const warning = 'WARNING';

function log(message) {
    console.log(message);
}

// module.exports.log = log;
// module.exports.error = error;

module.exports = {
     log,   //ეს არის ფუნქციის ექსპორტისთვის
     error,
     info,
     warning,
}