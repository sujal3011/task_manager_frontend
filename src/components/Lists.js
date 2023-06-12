import React, { useContext, useEffect,useState } from 'react'
import listContext from '../context/lists/listContext'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Lists = () => {
    const navigate=useNavigate();
    const context = useContext(listContext);
    const { lists, getLists,deleteList,addList} = context;

    const [list, setList] = useState({ title: "" });

    const handleonChange = (e) => {
        setList({ title: e.target.value });
    }

    const handleCreateList = () => {

        if (list.title.length >= 2) 
        {
            console.log(list.title);
            addList(list.title);
            setList({ title: "" });
        }
        else{
            console.log("Enter a valid title");
        }
    }

    useEffect(() => {

        if(localStorage.getItem("token")){
            getLists();
        }
        else{
            navigate("/login");
        }


    }, [])

    return (
        <div className='border rounded-md flex flex-col items-center justify-start w-full sm:w-9/12 h-4/5 my-8 shadow-2xl bg-white'>

            <h1 className="my-4 text-3xl font-extrabold text-teal-600 dark:text-white md:text-5xl lg:text-6xl">My Lists</h1>

            <div className='flex  border-lime-900 rounded-t-md items-center justify-center px-3 py-3 w-11/12 sm:w-4/5 mt-4 '>
               
                <form className="w-4/5">
                <div className="flex items-center border-b border-teal-500 py-2">
                    <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Create a new list.." aria-label="Full name" onChange={handleonChange}/>

                    <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700  border-2 text-white py-2 px-3 rounded mx-2" type="button" onClick={handleCreateList}>
                    Create
                    </button>
                </div>
                </form>

            </div>


            <div className='flex flex-col items-center justify-between px-3 py-3 pt-6 pb-6 w-11/12 sm:w-4/5 mb-4 overflow-y-auto no-scrollbar'>
                {lists.map((list) => {
                    return (

                        <div className='border rounded-md flex w-full items-center justify-between px-3 py-3 mx-3 my-3' key={list._id}>

                            <p className='text-slate-600 font-semibold'>{list.title}</p>

                            <div className='flex items-center'>

                                <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mx-3'>
                                <Link to={`/${list._id}/tasks`} className='cursor-pointer'>View Tasks</Link>
                                </button>

                                <i className="fas fa-trash-alt text-red-500 cursor: pointer" onClick={()=>{deleteList(list._id)}}></i>

                                <Link to={`/updateList/${list._id}`} className='cursor-pointer'><i className="fas fa-pencil-alt me-3 mx-3 text-teal-500"></i></Link>

                            </div> 
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default Lists