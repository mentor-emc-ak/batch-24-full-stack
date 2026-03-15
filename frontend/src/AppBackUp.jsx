import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
  const [todos, setTodos] = useState([])

  const fetchTodos = () => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => {
        setTodos(json)
        fetch('https://jsonplaceholder.typicode.com/todos/2')
          .then(response => response.json())
          .then(json => {
            fetch('https://jsonplaceholder.typicode.com/todos/3')
              .then(response => response.json())
              .then(json => {
                fetch('https://jsonplaceholder.typicode.com/todos/4')
                  .then(response => response.json())
                  .then(json => {
                    console.log(json)
                  })
                  .catch(error => {
                    console.warn('Error fetching todo 4:', error)
                  })
              })
            .catch(error => {
              console.warn('Error fetching todo 3:', error)
            })
          })
          .catch(error => {
            console.warn('Error fetching todo 2:', error)
          })
      })
      .catch(error => {
        console.warn('Error fetching todos:', error)
      })
  }

  const fetchTodosAsync = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos')
      const data = await response.json()
      setTodos(data)
      console.log(data)
      const response2 = await fetch('https://jsonplaceholder.typicode.com/todos/2')
      const data2 = await response2.json()
      console.log(data2)
      const response3 = await fetch('https://jsonplaceholder.typicode.com/todos/3')
      const data3 = await response3.json()
      console.log(data3)
      const response4 = await fetch('https://jsonplaceholder.typicode.com/todos/4')
      const data4 = await response4.json()
      console.log(data4)
    } catch (error) {
      console.log('Error fetching todos:', error)
    }
  }


  const axiosTodosAsync = async () => {
    try {
      const response = await axios('https://jsonplaceholder.typicode.com/todos')
      console.log('Status Code:', response.status)
      const data = response.data
      setTodos(data)
      console.log(data)
      const response2 = await axios('https://jsonplaceholder.typicode.com/todos/2')
      console.log('Status Code:', response2.status)
      const data2 = response2.data
      console.log(data2)
      const response3 = await axios('https://jsonplaceholder.typicode.com/todos/3')
      const data3 = response3.data
      console.log(data3)
      const response4 = await axios('https://jsonplaceholder.typicode.com/todos/4')
      const data4 = response4.data
      console.log(data4)
    } catch (error) {
      console.log('Error fetching todos:', error)
    }
  }





  useEffect(() => {
    axiosTodosAsync()
  }, [])


  // try {
  //     const response = await fetchTodos()
  //     console.log(response)
  // } catch (error) {
  //     console.error(error)
  // }

  // fetch('https://jsonplaceholder.typicode.com/todos')
  //   .then(response => response.json())
  //   .then(json => console.log(json))

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
