// implement your API here
const http = require('http'); 
const express = require('express'); 

const port = 5000; 

const server = express(); 

const db = require('./data/db.js'); 

server.use(express.json())

//create new user

server.post('/api/users', (req, res)=> {
   db.insert(req.body)
   .then(r => res.send(r))
   .catch(error => res.json(error)); 

})

//returns an array of all users in db

server.get('/api/users', (req, res) => {
   db.find()
   .then( r => {
      res.send(r)
   })
   .catch(error => res.send('Tbh...Idk what happened but some kind of error occured!'))
})

//get user by id 

server.get('/api/users/:id', (req, res) => {
   db.findById(req.params.id)
   .then(
      r => res.send(r)
   )
   .catch(error => res.send(error))
})

//delete user by id

server.delete('/api/users/:id', (req, res) => {
    db.remove(req.params.id)
    .then(
        r => res.send(r)
    )
    .catch(
        error => res.json({'error' : 'could not delete user'})
    )
})

//update user
server.put('/api/users/:id', (req, res) => {
  //code
  db.update(req.params.id, req.body)
    .then(
        r => res.json(r)
    ).catch(error => console.log(error))
})


server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);