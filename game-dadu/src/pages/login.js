import React,{useState} from 'react' 
import {Alert} from "react-bootstrap"
import {useNavigate} from 'react-router-dom'

import {API,setAuthToken} from "../config/api"

const Login = () => {

    const navigate= useNavigate()
    const [message,setMessage] = useState(null)
    const [form,setForm] = useState({
        email:"",
        password:"",
    })
    console.log(form);
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
            console.log(form);
            // conver form data to string
            const body = JSON.stringify(form)

            //insert data to database
            const response = await API.post("/login",body,config)
            console.log(response);

            localStorage.setItem("token",response.data.data.token)

            if(localStorage.token){
                setAuthToken(localStorage.token)
            }
            // setAuthToken(response.data.data.token)
            // console.log(response.data.data.token);

            if(response.status ===200){
                const alert =<Alert variant='success'>
                    success
            </Alert>
            setMessage(alert)
            navigate('/home')
            }


        } catch (error) {
            console.log(error);
            const alert =<Alert variant='danger'>
                    failed
            </Alert>
            setMessage(alert)
        }
        
    }

  return (
            <div className="modalSignUp p-4 w-50 bg-danger rounded" style={{margin:"auto",marginTop:"100px"}}>
                <form className="d-inline mt-5" onSubmit={handleSubmit}>
                {message}
                    <h3 className='fw-bold mb-4'>Login</h3>
                    <div>
                        <input type="email" name="email" placeholder="Email" className='w-100 mb-3 bgInput' onChange={handleChange} />
                    </div>
                    <div>
                        <input type="password" name="password" placeholder="Password" className='w-100 mb-3 bgInput' onChange={handleChange}/>          
                    </div>
                    <button type="submit" className='w-100 colorOrange border-0 text-light fw-bold ' style={{height:"35px",borderRadius:"5px",background:"black"}}>
                        Login
                    </button>
                    <p className='text-center mt-2'>Don't have an account ? Klik <b  style={{cursor:"pointer"}} onClick={()=> navigate('/')} >Here</b> </p>
                </form>
            </div> 
  )
}

export default Login