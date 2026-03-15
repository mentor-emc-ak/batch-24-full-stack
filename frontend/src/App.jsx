import { useEffect, useState } from "react"
import axios from "axios"

const axiosInstance = axios.create({
  baseURL: 'https://batch-24-full-stack.vercel.app'
})

function App() {
  const [todos, setTodos] = useState([])
  const [selectedTodoId, setSelectedTodoId] = useState(null)
  const [selectedTodo, setSelectedTodo] = useState(null)
  const [loading, setLoading] = useState(false)

  const axiosFetchTodos = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get('/')
      // const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
      setTodos(response.data)
    } catch (error) {
      console.warn('Error fetching todos with axios:', error)
    } finally {
      setLoading(false)
    }
  }

  const createTodo = async () => {
    const userId = document.getElementById('userId').value
    const title = document.getElementById('title').value

    axiosInstance.post('/', { userId, title })
      .then(response => {
        console.log('Todo created:', response.data)
        axiosFetchTodos() // Refresh the todo list after creating a new todo
      })
      .catch(error => {
        console.warn('Error creating todo with axios:', error)
      })
  }

  useEffect(() => {
    if (selectedTodoId === null) return
    try {
      const fetchData = async () => {
        setLoading(true)
        const response = await axiosInstance.get(`/${selectedTodoId}`)
        setSelectedTodo(response.data)
        setLoading(false)
      }

      fetchData()
    } catch (error) {
      console.warn('Error fetching selected todo with axios:', error)
    }
  }, [selectedTodoId])

  useEffect(() => {
    axiosFetchTodos()
  }, [])

  const updateTodoTitle = (e) => {
    const updatedTitle = e.target.value
    setSelectedTodo(prev => ({ ...prev, title: updatedTitle }))
  }

  const toggleTodoCompleted = () => {
    setSelectedTodo(prev => ({ ...prev, completed: !prev.completed }))
  }

  const updateTodo = () => {
    if (!selectedTodo) return
    axiosInstance.put(`/${selectedTodo._id}`, selectedTodo)
      .then(response => {
        console.log('Todo updated:', response.data)
        axiosFetchTodos() // Refresh the todo list after updating the todo
      })
      .catch(error => {
        console.warn('Error updating todo with axios:', error)
      })
  }

  return (
    <div>
      <h1>Create Todo</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: 5}}>
        <input type="text" placeholder="User ID" id="userId" />
        <input type="text" placeholder="Title" id="title" />
        <button onClick={createTodo}>Create</button>
      </div>
      <h1>Todo List</h1>
      {loading && <p>Loading...</p>}
      {selectedTodo && (
        <div>
          <h2>Selected Todo</h2>
          <p>ID: {selectedTodo._id}</p>
          <input type="text" value={selectedTodo.title} onChange={updateTodoTitle} />
          <input type="checkbox" checked={selectedTodo.completed} onChange={toggleTodoCompleted} />
          <button onClick={updateTodo}>Update</button>
        </div>
      )}
      <ol>
        {todos.map(todo => (
          <li key={todo._id}>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}><p>{todo.title}</p> - <p>{todo.completed ? 'Completed' : 'Not Completed'}</p> - <button onClick={() => setSelectedTodoId(todo._id)}>Edit</button> <button onClick={() => axiosInstance.delete(`/${todo._id}`).then(() => axiosFetchTodos())}>Delete</button></div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default App
