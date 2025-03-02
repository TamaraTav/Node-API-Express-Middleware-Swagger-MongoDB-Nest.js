import http from 'http';
import fs from 'fs';
import url from 'url';
import slugify from "slugify";

const str = slugify("Hello, World!", {lower: true});
//რამდენიმე სიტყვას აერთებს ერთმანეთთან ტირეებით და გარდაქმნის პატარა ასოებად ყველაფერს


const server = http.createServer((req, res) => {
    const {id} = url.parse(req.url, true).query;
    const {pathname} = url.parse(req.url, true);

    if (pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('HELLO WORD !!!');
    } else if (pathname === '/login') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('LOGIN !!!');

    } else if (pathname === '/posts') {

        const posts = fs.readFileSync('data.json', "utf8");

        if(id) {
            const post = JSON.parse(posts).find((post) => post.id === Number(id));
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(post));
            return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(posts);
    }

       else if (pathname === '/about') {
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

