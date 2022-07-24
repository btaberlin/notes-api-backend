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

// cambiar lo anterior por express
const express = require('express')
// cors für später
const cors = require('cors')
const app = express()
// erst noch später für logger
const logger = require('./loggerMiddlerware')

// erst später: für POST
app.use(express.json())
// const http = require('http')
// ungefähr wie import http from http (modernere Schreibweise von JS). Funktioniert aber anders. Typische Schreibweise von Node.js um Muduls zu laden

// mittels http kreieren wir ein Server, was unter "app" gespeichert wird
// le pasamos como parametro un callback (es una funcion que se ejecuta, cada vez que le llegue una request/ peticion)
// const app = http.createServer((req, res) => {
// como respuesta mandamos al Head un StatusCode: 200 y {'Content-Type': 'text/plain'} para que el navegador sepa lo que devolvemos
//   res.writeHead(201, {'Content-Type': 'text/plain'})
//   res.end('Hello World\n')
// res.writeHead(201, {'Content-Type': 'application/json'})
// res.end(JSON.stringify(notes))
// })

//
// app.use((request, response, next) => {
//   console.log(request.method)
//   console.log(request.path)
//   console.log(request.body)
//   console.log('---------')
//   next()
// })

// const logger = (request, response, next) => {
//   console.log(request.method)
//   console.log(request.path)
//   console.log(request.body)
//   console.log('---------')
//   next()
// }

app.use(cors()) // para permitir que cualquier origen pueda accerder a la api
app.use(logger)

// Mit Express
app.get('/', (request, response) => {
  response.send('<h1>Home</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  console.log({ id })
  // response.json(note)
  if (note) {
    response.json(note)
  } else {
    response.status(404).json({
      error: 'Nicht gefunden (not found)'
    }).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
  // const note = notes.find(note => note.id ===id)
  // console.log({id})
  // // response.json(note)
  // if (note) {
  //     response.json(note)
  // } else {
  //     response.status(404).end()
  // }
})

app.post('/api/notes', (request, response) => {
  const note = request.body
  // console.log(note)

  if (!note || !note.content) {
    return response.status(400).json({
      Error: 'note.content is missing'
    })
  }

  const ids = notes.map(note => note.id)
  // mapt: Array Iteration. Die Noten müssen sequenttiell sein. Müssen aber nicht ordenadas sein
  const maxId = Math.max(...ids)

  // besser uuid, aber mongo macht das automatisch

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    Date: new Date().toISOString()
  }

  // notes = notes.concat(newNote)
  notes = [...notes, newNote]
  response.status(201).json(newNote)
})

/// ////////////////////////////////////////
// para que entre aqui hay que comentar el "app.get('/api/notes/:id', (request, response) => {"
app.use((request, response) => {
  console.log(request.path)
  response.status(404).json({
    error: 'Not founddd'
  })
})
/// //////////////////////////////////////////////////////////

const PORT = 3001
// el servidor en express se levanta de forma asyncrona: cuendo se termine de levantar el servidos en el puerto 3001, entonces se manda el console.log
// de esta forma se puede gfgfgf la pequena latencia de tiempo para levantar el servidos
// de la otra forma, se muestra el console.log, aunque el servidos no esta completamente levantado todavia
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}/`)
})

let notes = [
  {
    id: 1,
    content: 'Bla 1',
    date: '2019-05-30',
    important: true
  },
  {
    id: 2,
    content: 'Bla 2',
    date: '2022-05-30',
    important: false
  },
  {
    id: 3,
    content: 'Bla 3',
    date: '2019-05-30',
    important: true
  }
]
