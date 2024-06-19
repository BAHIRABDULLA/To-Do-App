import React, { useState } from 'react'
import './App.css'

function App() {
  const [value, setValue] = useState('')
  const [toDos, setToDos] = useState([])
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(value);
    setToDos([...toDos, { id: Date.now(), text: value ,completed:false, isEditing:false}])
    setValue('')
    console.log(setToDos);
  }
  const deleteTodo=(id)=>{
    setToDos(toDos.filter((toDo)=>toDo.id!== id))
  }
  const toggleTodo = (id)=>{
    setToDos(toDos.map(todo =>(
      todo.id ===id ?{...todo,completed:!todo.completed}:todo
      )))
  }
  const startEditing =(id)=>{
    setToDos(toDos.map(todo=>
      todo.id===id ? {...todo,isEditing:true}:todo
    ))
  }
  const handleChange = (id,newText)=>{
    setToDos(toDos.map(todo=>(
      todo.id===id ?{...todo,text:newText}:todo
    )))
  }
  const saveEdit = (id,newText)=>{
    setToDos(toDos.map(todo=>
      todo.id ===id?{...todo,text:newText,isEditing:false}:todo
    ))
  }
  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <div className="flex items-center   justify-center mb-8">
        <h1 className="text-3xl font-bold text-white hover:text-gray-300">
          To Do List
        </h1>
      </div>
      <div className="container bg-red-950 max-w-prose  rounded mx-auto">
        <form className='toDoForm' onSubmit={handleSubmit}>
          <div className="bg-white rounded shadow p-6">
            <div className='flex '>
              <input className='bg-grey flex-grow border  '  onChange={(e) => setValue(e.target.value)} value={value} type='text' placeholder='Add new task...' />

              <button className='bg-amber-400  px-3 py-3  font-bold	rounded'>Add</button>
            </div>
          </div>
        </form>
        <div>
          {toDos.map(todo => (
            <div key={todo.id} className='flex '>
              <input type="checkbox" checked={todo.completed} onChange={()=>toggleTodo(todo.id)} className='m-3	'/>
              {/* <input type="text" value={todo.text} disabled /> */}
              {todo.isEditing?(
                <input type="text" value={todo.text} className='flex-grow  pr-2.5  rounded' onChange={(e)=>handleChange(todo.id,e.target.value)}/>
              ):(
                <input type="text" value={todo.text} className={`flex-grow pr-2.5  rounded ${todo.completed ? 'line-through' :''} `} disabled/>
              )}
              {todo.isEditing ? (
                <button onClick={()=>saveEdit(todo.id ,todo.text)} className='bg-green-500 rounded-lg px-2 py-2  hover:bg-green-700 text-white'>Save</button>
              ):(
                <button onClick={()=>startEditing(todo.id)} className='bg-blue-500 rounded-lg px-2 py-2 hover:bg-blue-700 text-white'>Edit</button>
              )}
              <button onClick={()=>deleteTodo(todo.id)} className='bg-red-500 rounded-lg px-2 py-2  hover:bg-red-700 text-white'>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
