// https://nodejs.dev/learn

// const http = require('http')

// const hostname = '127.0.0.1'
// const port = 3000

// const server = http.createServer((req, res) => {
//   res.statusCode = 200
//   res.setHeader('Content-Type', 'text/plain')
//   res.end('Hello World\n')
// })

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`)
// })

const http = require('http')
// ungefähr wie import http from http (modernere Schreibweise von JS). Funktioniert aber anders. Typische Schreibweise von Node.js um Muduls zu laden

// mittels http kreieren wir ein Server, was unter "app" gespeichert wird
// le pasamos como parametro un callback (es una funcion que se ejecuta, cada vez que le llegue una request/ peticion)
const app = http.createServer((req, res) => {
    // como respuesta mandamos al Head un StatusCode: 200 y {'Content-Type': 'text/plain'} para que el navegador sepa lo que devolvemos
//   res.writeHead(201, {'Content-Type': 'text/plain'})
//   res.end('Hello World\n')
    res.writeHead(201, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(notes))
})

// per default landen wir auf PORT 80 (http, für https 443). Der ist aber nicht frei
const PORT = 3001 //egal, hauptsache frei
app.listen(PORT) //sagen wo der servidos hören soll
console.log(`Server running on port ${PORT}/`) 

notes = [
    {
        "id": 1,
        "content": "Bla 1",
        "date": "2019-05-30",
        "important": true
    },
    {
        "id": 2,
        "content": "Bla 2",
        "date": "2022-05-30",
        "important": false
    },
    {
        "id": 3,
        "content": "Bla 3",
        "date": "2019-05-30",
        "important": true
    },
]