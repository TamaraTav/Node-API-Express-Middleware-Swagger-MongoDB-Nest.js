import http from 'http';
import fs from 'fs';


const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('HELLO WORD !!!');
    } else if (req.url === '/login') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('LOGIN !!!');

    } else if (req.url === '/posts') {
        const posts = fs.readFileSync('data.json', "utf8");
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(posts);
    }
       else if (req.url === '/about') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('About US !!!');
        }
})

server.listen(4040, "localhost", () => {
    console.log('Server is running on port http://localhost:4040');
});



// const server2 = http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Welcome to my Node.js server !\n');
// })
// server2.listen(3000, "localhost", () => {
//     console.log("Server is running on port http://localhost:3000");
// })

