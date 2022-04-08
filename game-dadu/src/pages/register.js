import React,{useState} from 'react'

import {useNavigate} from 'react-router-dom'
import {Alert} from "react-bootstrap"

import {API} from "../config/api"

const Register = () => {

    const navigate= useNavigate()
    const [message,setMessage] = useState(null)
    const [form,setForm] = useState({
        email:"",
        password:"",
        username:""
    })

    const {email,password,username}=form

    const handleChange =(e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value,
        })
        console.log(form);
    }

    const handleSubmit = async(e) =>{
        try {
            e.preventDefault();

            // configuratton content-type
            const config ={
                headers:{
                    "Content-type":"application/json"
                }
            }

            // conver form data to string
            const body = JSON.stringify(form)

            //insert data to database
            const response = await API.post("/register",body,config)
            console.log(response);
            if (response.data.status == "success") {
                const alert= <Alert variant='success'>
                    success
                </Alert>
                setMessage(alert)
            }


        } catch (error) {
            console.log(error);
            const alert =<Alert variant='danger'>
                    failed
            </Alert>
            setMessage(alert)
        }


        setForm({
            email:"",
            password:"",
            fullName:""
        })
    }

  return (
            <div className="modalSignUp p-4 w-50 bg-danger rounded" style={{margin:"auto",marginTop:"100px"}}>
                <form className="d-inline mt-5" onSubmit={handleSubmit} >
                {message}
                    <h3 className='fw-bold mb-4'>Register</h3>
                    
                    <div>
                        <input type="email" name="email" placeholder="Email" className='w-100 mb-3 bgInput' 
                        onChange={handleChange} value={email}/>
                    </div>
                    <div>
                        <input type="password" name="password" placeholder="Password" className='w-100 mb-3 bgInput' 
                        onChange={handleChange} value={password}/>          
                    </div>
                    <div>
                        <input type="text" name="username" placeholder="Username" className='w-100 mb-3 bgInput' 
                        onChange={handleChange} value={username}/>          
                    </div>
                    <button type="submit" className='w-100 colorOrange border-0 text-light fw-bold ' style={{height:"35px",borderRadius:"5px",background:"black"}}>
                        Sign Up
                    </button>
                    <p className='text-center mt-2'>Already have an account ? Klik <b  style={{cursor:"pointer"}} onClick={()=> navigate('/login')} >Here</b> </p>
                </form>
            </div> 
  )
}

export default Register