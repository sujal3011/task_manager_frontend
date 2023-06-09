import React from 'react'
import Lists from './Lists'
import Navbar from './Navbar'

const Home = () => {
    return (
        <>
            <div className='h-screen flex flex-col items-center bg-cyan-50'>
                <Navbar />
                <Lists />
            </div>
        </>
    )
}

export default Home