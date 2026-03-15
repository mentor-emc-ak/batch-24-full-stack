const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

const port = 3000

// todo schema
const todoSchema = new mongoose.Schema({
  userId: Number,
  title: String,
  completed: Boolean
})

// todo model
const Todo = mongoose.model('Todo', todoSchema)

// Mongoose connection
const uri = "mongodb+srv://batch-24:batch-24-password@cluster0.cdx27hb.mongodb.net/emc?appName=Cluster0";
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB via Mongoose!'))
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

/**
 * HTTP Methods:
 * GET: Retrieve data from the server
 * POST: Send data to the server
 * PUT/PATCH: Update existing data on the server
 * DELETE: Remove data from the server
 * 
 * app.get('/users', (req, res) => {})
 * app.post('/users', (req, res) => {})
 * app.put('/users/:id', (req, res) => {})
 * app.delete('/users/:id', (req, res) => {})
 */

app.use(express.json()) // Middleware to parse JSON bodies

app.use(cors(
  {
    origin: 'https://batch-24-full-stack-app.vercel.app'
  }
))

app.get('/', async (req, res) => {
  try {
    const todos = await Todo.find() // Fetch all todos from the database
    res.status(200).json(todos)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

app.get('/:id', async (req, res) => {
  try {
    const todoId = req.params.id
    const todo = await Todo.findById(todoId) // Fetch the todo by ID from the database
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' })
    }
    res.status(200).json(todo)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

app.post('/', (req, res) => {
  try {
    if (!req.body.userId) {
      return res.status(400).json({ error: 'User ID is required' })
    }
    if (!req.body.title) {
      return res.status(400).json({ error: 'Title is required' })
    }

    const payload = {
      userId: req.body.userId,
      title: req.body.title,
      completed: req.body.completed || false
    }

    const newTodo = new Todo(payload)
    newTodo.save() // Save the new todo to the database
    res.status(201).json(payload) // Return the created todo with a 201 status code
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.put('/:id', async (req, res) => {
  try {
    const todoId = req.params.id
    const updatedData = req.body

    const updatedTodo = await Todo.findByIdAndUpdate(todoId, updatedData, { new: true }) // Update the todo and return the updated document
    
    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' })
    }

    res.status(200).json(updatedTodo) // Return the updated todo

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.delete('/:id', async (req, res) => {
  try {
    const todoId = req.params.id
    const deletedTodo = await Todo.findByIdAndDelete(todoId)

    if (!deletedTodo) {
      return res.status(404).json({ error: 'Todo not found' })
    }

    res.status(200).json({ message: 'Todo deleted successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
