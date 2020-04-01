import React, { useState, useRef } from 'react';
import './App.css';

type FormElement = React.FormEvent<HTMLFormElement>
interface iTask {
  name: string,
  done: boolean
}

function App(): JSX.Element {

  const [newTask, setNewTask] = useState<string>('')
  const [tasks, setTask] = useState<iTask[]>([])
  const taskInput = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormElement) => {
    e.preventDefault()
    addTask(newTask)
    setNewTask('')
  }

  const addTask = (name: string) => {
    const newTasks = [...tasks, { name, done: false }]
    setTask(newTasks)
    taskInput.current?.focus()
  }

  const toggleDoneTaskt = (i: number) => {
    const newTasks: iTask[] = [...tasks]
    newTasks[i].done = !newTasks[i].done
    setTask(newTasks)
  }

  const removeTastk = (i: number) => {
    const newTasks: iTask[] = [...tasks]
    newTasks.splice(i, 1)
    setTask(newTasks)
  }

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={e => setNewTask(e.target.value)}
                  className="form-control"
                  value={newTask}
                  ref={taskInput}
                  autoFocus />
                <button className="btn btn-success btn-block mt2">Save</button>
              </form>
            </div>
          </div>
          {
            tasks.map((t: iTask, i: number) => (
              <div className="card card-body mt-2" key={i}>
                <h2 style={{ textDecoration: t.done ? 'line-through' : '' }}>{t.name}</h2>
                <div>
                  <button className="btn btn-secondary" onClick={() => toggleDoneTaskt(i)}>
                    {t.done ? '✓' : '✗'}
                  </button>
                  <button className="btn btn-danger" onClick={() => removeTastk(i)}>
                  🗑️
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
