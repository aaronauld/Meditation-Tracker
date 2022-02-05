import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:3001/tasks')
    const data = await res.json()

    return data
  }

  //Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:3001/tasks/${id}`)
    const data = await res.json()
    console.log(res)
    console.log(data)

    return data
  }

  //Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task}
    // setTasks([...tasks, newTask])
  }

  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'DELETE'
    })

    setTasks(tasks.filter((task) => task._id !== id))
  }

  //Toggle reminder
  const toggleReminder = async (id) => {
    console.log("here")
    const taskToToggle = await fetchTask(id)
    
    const updateTask = { ...taskToToggle,
      reminder: !taskToToggle.reminder }

      const res = await fetch(`http://localhost:3001/tasks/${id}`, {
        method:'PATCH',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updateTask)
      })

      const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task._id === id ? { ...task, reminder:
        data.reminder } : task
      )
    )
  }

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
        <Routes>
          <Route path='/' exact element={
          (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
              ) : ('No Tasks to Show')}
            </>
          )} />
          <Route path='/about' element={About()} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
