const express = require('express')
const { getDb, connectToDb } = require('./db')
const { ObjectId } = require('mongodb')

// init app & middleware
const app = express()
app.use(express.json())

// db connection
let db

connectToDb((err) => {
  if(!err){
    app.listen('3000', () => {
      console.log('app listening on port 3000')
    })
    db = getDb()
  }
})

// routes
// Define a route for the root endpoint ("/")
app.get('/', (req, res) => {
  res.send('Welcome to the bookstore API');
});


app.get('/Draglines', (req, res) => { // Changed from '/books' to '/Draglines'
  // current page
  const page = req.query.p || 0
  const booksPerPage = 3
  
  let Draglines = []

  db.collection('Draglines') // Changed from 'books' to 'Draglines'
    .find({}, { _id: 1, title: 1, author: 1 }) // Specify fields to include
    .sort({author: 1})
    .skip(page * booksPerPage)
    .limit(booksPerPage)
    .toArray() // Use toArray to convert cursor to array
    .then((docs) => {
      res.status(200).json(docs)
    })
    .catch((err) => {
      res.status(500).json({error: 'Could not fetch the documents'})
    })
})

app.get('/Draglines/:id', (req, res) => { // Changed from '/books/:id' to '/Draglines/:id'

  if (ObjectId.isValid(req.params.id)) {

    db.collection('Draglines') // Changed from 'books' to 'Draglines'
      .findOne({_id: new ObjectId(req.params.id)})
      .then(doc => {
        res.status(200).json(doc)
      })
      .catch(err => {
        res.status(500).json({error: 'Could not fetch the document'})
      })
      
  } else {
    res.status(500).json({error: 'Could not fetch the document'})
  }

})

app.post('/Draglines', (req, res) => { // Changed from '/books' to '/Draglines'
  const book = req.body

  db.collection('Draglines') // Changed from 'books' to 'Draglines'
    .insertOne(book)
    .then(result => {
      res.status(201).json(result)
    })
    .catch(err => {
      res.status(500).json({err: 'Could not create new document'})
    })
})

app.delete('/Draglines/:id', (req, res) => { // Changed from '/books/:id' to '/Draglines/:id'

  if (ObjectId.isValid(req.params.id)) {

  db.collection('Draglines') // Changed from 'books' to 'Draglines'
    .deleteOne({ _id: new ObjectId(req.params.id) })
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json({error: 'Could not delete document'})
    })

  } else {
    res.status(500).json({error: 'Could not delete document'})
  }
})

app.patch('/Draglines/:id', (req, res) => { // Changed from '/books/:id' to '/Draglines/:id'
  const updates = req.body

  if (ObjectId.isValid(req.params.id)) {

    db.collection('Draglines') // Changed from 'books' to 'Draglines'
      .updateOne({ _id: new ObjectId(req.params.id) }, {$set: updates})
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({error: 'Could not update document'})
      })

  } else {
    res.status(500).json({error: 'Could not update document'})
  }
})




// const express = require('express')
// const { getDb, connectToDb } = require('./db')
// const { ObjectId } = require('mongodb')

// // init app & middleware
// const app = express()
// app.use(express.json())

// // db connection
// let db

// connectToDb((err) => {
//   if(!err){
//     app.listen('3000', () => {
//       console.log('app listening on port 3000')
//     })
//     db = getDb()
//   }
// })

// // routes
// // Define a route for the root endpoint ("/")
// app.get('/', (req, res) => {
//   res.send('Welcome to the bookstore API');
// });


// app.get('/books', (req, res) => {
//   // current page
//   const page = req.query.p || 0
//   const booksPerPage = 3
  
//   let books = []

//   db.collection('books')
//     .find({}, { _id: 1, title: 1, author: 1 }) // Specify fields to include
//     .sort({author: 1})
//     .skip(page * booksPerPage)
//     .limit(booksPerPage)
//     .toArray() // Use toArray to convert cursor to array
//     .then((docs) => {
//       res.status(200).json(docs)
//     })
//     .catch((err) => {
//       res.status(500).json({error: 'Could not fetch the documents'})
//     })
// })

// app.get('/books/:id', (req, res) => {

//   if (ObjectId.isValid(req.params.id)) {

//     db.collection('books')
//       .findOne({_id: new ObjectId(req.params.id)})
//       .then(doc => {
//         res.status(200).json(doc)
//       })
//       .catch(err => {
//         res.status(500).json({error: 'Could not fetch the document'})
//       })
      
//   } else {
//     res.status(500).json({error: 'Could not fetch the document'})
//   }

// })

// app.post('/books', (req, res) => {
//   const book = req.body

//   db.collection('books')
//     .insertOne(book)
//     .then(result => {
//       res.status(201).json(result)
//     })
//     .catch(err => {
//       res.status(500).json({err: 'Could not create new document'})
//     })
// })

// app.delete('/books/:id', (req, res) => {

//   if (ObjectId.isValid(req.params.id)) {

//   db.collection('books')
//     .deleteOne({ _id: new ObjectId(req.params.id) })
//     .then(result => {
//       res.status(200).json(result)
//     })
//     .catch(err => {
//       res.status(500).json({error: 'Could not delete document'})
//     })

//   } else {
//     res.status(500).json({error: 'Could not delete document'})
//   }
// })

// app.patch('/books/:id', (req, res) => {
//   const updates = req.body

//   if (ObjectId.isValid(req.params.id)) {

//     db.collection('books')
//       .updateOne({ _id: new ObjectId(req.params.id) }, {$set: updates})
//       .then(result => {
//         res.status(200).json(result)
//       })
//       .catch(err => {
//         res.status(500).json({error: 'Could not update document'})
//       })

//   } else {
//     res.status(500).json({error: 'Could not update document'})
//   }
// })


