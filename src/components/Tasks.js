import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import taskContext from '../context/tasks/taskContext';
import Navbar from './Navbar';

const Tasks = () => {
  const context = useContext(taskContext);
  const { tasks, getTasks, addTask, editTaskStatus, deleteTask } = context;
  const [task, setTask] = useState({ description: "", dueDate: Date.now });
  const [dropdownfilteropen, setDropdownfilteropen] = useState(false);  //This state is for the dropdown menu to filter tasks 
  const [dropdownsortopen, setDropdownsortopen] = useState(false);
  const [taskstatus, setTaskstatus] = useState("all");
  const [taskorder, setTaskorder] = useState("assignedDate_ascending");
  const [query, setQuery] = useState("");

  const handleDropDownFilterClick = () => {
    setDropdownfilteropen(!dropdownfilteropen);
  }

  const handleDropDownSortClick = () => {
    setDropdownsortopen(!dropdownsortopen);
  }

  const { list_id } = useParams();

  const handleStatusSelect = (status) => {
    //getTasks(list_id, status);
    setTaskstatus(status);
    setDropdownfilteropen(false);
  }

  const handleSortSelect = (order) => {
    setTaskorder(order);
    setDropdownsortopen(false);

  }

  const onChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  }

  const handleClick = () => {

    if (task.description.length >= 5) {
      addTask(list_id, task.description, task.dueDate);
      setTask({ description: "", dueDate: Date.now })

    }
    else {
      console.log("Enter a valid description of the task");
    }
  }

  const checkOverdue = (dueDate) => {
    let currDate = new Date();
    if (currDate.getTime() > dueDate.getTime()) {
      return true;
    }
    return false;
  }

  useEffect(() => {

    getTasks(list_id,taskstatus,taskorder,query);

  }, [taskstatus,taskorder,query]);

  return (

    <>

      <Navbar />

      <div className=' flex flex-col items-center justify-center bg-cyan-50'>



        <div className=' w-screen flex items-center justify-center mb-10 '>
          <div className='border bg-white rounded-md shadow-2xl w-11/12 sm:w-3/5 flex flex-col items-center justify-center mt-6'>

            <h1 className="my-4 text-xl font-extrabold text-teal-600 md:text-4xl lg:text-5xl">Add Tasks</h1>
            <input placeholder='Add a new task' className="border rounded-md py-3 px-3 w-4/5 outline-none mt-8" name='description' onChange={onChange} value={task.description} />

            <div className='flex w-4/5 items-center justify-center my-3'>
              <input type="date" className="border rounded-md py-3 px-3 w-4/5 outline-none" name='dueDate' onChange={onChange} value={task.dueDate} />
            </div>

            <div className='flex items-center justify-center my-3 w-4/5'>
              <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700  border-2 py-2 px-3 rounded mx-2" type="button" onClick={handleClick}>Add</button>
            </div>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center bg-white shadow-2xl w-11/12 sm:w-3/5 mb-5'>

          <div className='flex rounded-t items-center justify-center px-3 py-3 w-11/12 mt-4 '>
            <h1 className="my-4 text-xl font-extrabold text-teal-600 md:text-5xl lg:text-6xl">My Tasks</h1>
          </div>


          <div className='flex items-center justify-center w-11/12'>

            <div className='flex items-center justify-center'>

              <div className="md:w-full">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white " id="inline-full-name" type="text" placeholder='Search' onChange={(e)=>{setQuery(e.target.value)}} />
              </div>
            </div>

            <div className="relative inline-block text-left mx-2">
              <div>
                <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={handleDropDownFilterClick}>
                  {taskstatus}
                  <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {
                dropdownfilteropen && <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                  <div className="py-1" role="none">

                    <button className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-300" role="menuitem" tabIndex="-1" id="menu-item-0" onClick={() => { handleStatusSelect("all") }}>All</button>
                    <button className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-300" role="menuitem" tabIndex="-1" id="menu-item-1" onClick={() => { handleStatusSelect("completed") }}>Completed</button>
                    <button className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-300" role="menuitem" tabIndex="-1" id="menu-item-2" onClick={() => { handleStatusSelect("active") }}>Active</button>
                    <button className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-300" role="menuitem" tabIndex="-1" id="menu-item-2" onClick={() => { handleStatusSelect("pending") }}>Pending</button>


                  </div>
                </div>

              }


            </div>

            <div className="relative inline-block text-left mx-2">
              <div>
                <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={handleDropDownSortClick}>
                  {taskorder}
                  <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {
                dropdownsortopen && <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                  <div className="py-1" role="none">

                    <button className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-300" role="menuitem" tabIndex="-1" id="menu-item-0" onClick={()=>{handleSortSelect("assignedDate_ascending")}}>Added Date (ascending)</button>
                    <button className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-300" role="menuitem" tabIndex="-1" id="menu-item-1" onClick={()=>{handleSortSelect("assignedDate_descending")}}>Added Date (descending)</button>
                    <button className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-300" role="menuitem" tabIndex="-1" id="menu-item-1" onClick={()=>{handleSortSelect("dueDate_ascending")}}>Due Date (ascending)</button>
                    <button className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-300" role="menuitem" tabIndex="-1" id="menu-item-1" onClick={()=>{handleSortSelect("dueDate_descending")}}>Due Date (descending)</button>



                  </div>
                </div>

              }


            </div>

          </div>




          <div className='flex flex-col items-center justify-center px-3 py-3 mb-4 w-11/12 '>
            {tasks.map((task) => {
              let isOverdue = false;
              let d = new Date(task.dueDate);
              isOverdue = checkOverdue(d);

              return (

                <div className='border rounded-md flex items-center justify-center px-3 py-3 mx-3 my-3 bg-white w-full' key={task._id}>

                  <div className='flex flex-col items-start justify-center w-full'>

                    <div className='flex items-center my-2 w-full'>

                      {!task.isCompleted && <input type="checkbox" name="status" value="status" className='mx-2' onChange={() => { editTaskStatus(task._id) }} />
                      }
                      <p className='text-slate-600 font-semibold text-left w-full'>{task.description}</p>

                      {!task.isCompleted && <Link to={`/${list_id}/updateTask/${task._id}`}><i className="fas fa-pencil-alt me-3 mx-3 text-teal-500" ></i></Link>}
                      <i className="fas fa-trash-alt text-red-500 cursor-pointer" onClick={() => { deleteTask(task._id) }}></i>

                    </div>
                    <div className='flex items-center justify-start'>
                      <label className='text-slate-900 font-bold mx-2'>Due date :</label>
                      <p className='my-2 font-mono italic'>{d.getDate()}-{d.getMonth()}-{d.getFullYear()}</p>
                    </div>

                    <div className='flex w-full justify-start my-1'>
                      {/* <label className='font-bold mx-2'>Status:</label> */}
                      <p className={`${task.isCompleted ? "text-green-700" : isOverdue ? "text-red-700" : "text-blue-700"} font-bold`}>{task.isCompleted ? "Completed" : isOverdue ? "Overdue" : "Ongoing"}</p>
                    </div>
                  </div>
                </div>
              )
            })}

          </div>

        </div>

      </div >

    </>


  )
}

export default Tasks