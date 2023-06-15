import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/auth/createUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })

        });

        const json = await response.json();
        console.log(json);

        if (json.success) {  
            localStorage.setItem("token", json.token);  
            navigate('/');
        }
        else {
            alert("Error");
        }
    }
    return (
        <div>
            <div className="flex items-center justify-center h-screen bg-no-repeat bg-cover bg-center bg-opacity-50 bg-emerald-100">
                <div className=" border shadow-2xl shadow-emerald-900 rounded-lg w-11/12 sm:w-3/5 flex flex-col items-center bg-white my-5">
                    <h4 className="text-center font-bold text-2xl my-5 font-serif">Create Account</h4>
                    <form onSubmit={onSubmit} className="w-full flex flex-col items-center">
                        <div className="flex flex-col items-center w-full">
                            <input type="text" className="border px-3 py-3 outline-none w-4/5 rounded my-5" placeholder="Enter your name" name='name' onChange={onChange} />
                            <input type="email" className="border px-3 py-3 outline-none w-4/5 rounded my-5" placeholder="Enter your email" name='email' onChange={onChange} />
                            <input type="password" className="border px-3 py-3 outline-none w-4/5 rounded my-5" placeholder="Enter your password" name='password' onChange={onChange} />

                            <input type="password" className={`px-3 py-3 outline-none w-4/5 rounded my-5 ${credentials.cpassword !== "" && credentials.password !== credentials.cpassword ? " border-red-600 shadow-sm shadow-red-400 border" : "border"}`} placeholder="Confirm your password" name='cpassword' onChange={onChange} />

                            {credentials.cpassword !== "" && credentials.password !== credentials.cpassword && <div  className="form-text text-red-600">Confirm password must be same as password</div>}

                        </div>
                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2">SIGN UP</button>
                    </form>
                    
                    

                    <div>

                        <a href={`${process.env.REACT_APP_SERVER_DOMAIN}/auth/google`}className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                            <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                            Sign in with Google
                        </a>
                    </div>

                    <p className="my-3">Already have an account? <Link className="font-bold underline" to="/login">Login here</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Signup