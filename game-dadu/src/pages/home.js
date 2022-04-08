import React, { useEffect, useState } from 'react'


import Dadu1 from '../galeri/dice1.png'
import Dadu2 from '../galeri/dice2.png'
import Dadu3 from '../galeri/dice3.png'
import Dadu4 from '../galeri/dice4.png'
import Dadu5 from '../galeri/dice5.png'
import Dadu6 from '../galeri/dice6.png'

import {API,setAuthToken} from "../config/api"

const Home = () => {

    const [form,setForm] =useState({
        user:null,
        dadu: null
        })

    const[input,setInput] =useState()

    const[dataPlayer,setDataPlayer] =useState([])

    const dataDadu =[1,2,2]
   
console.log(dataDadu);

        const arrayImg =[Dadu1,Dadu2,Dadu3,Dadu4,Dadu5,Dadu6]
        const acak = arrayImg[Math.floor(Math.random() * arrayImg.length)]
        const acak2 = arrayImg[Math.floor(Math.random() * arrayImg.length)]
        const acak3 = arrayImg[Math.floor(Math.random() * arrayImg.length)]
        

    const handleChange =(e)=>{
       
        setInput({
            number : e.target.value,
        })

        for (let n = 1; n <= input.number; n++) {
            const newDadu = "dadu"+n
            dataDadu.push(newDadu)
        }
        console.log(dataDadu);
    }

let daduPlayer=[1,2]

    const handleSubmit= async(e)=>{

        try {
            e.preventDefault()

            const config ={
                headers:{
                    "Content-type":"application/json"
                }
            }
            
            const body = JSON.stringify(input)
            
            const response = await API.post("/game",body,config)

            
            const dadu = response.data.findGame.numberOfDadu
            

            console.log(daduPlayer);

            const responsePlayers = await API.get(`/players/${response.data.findGame.id}`)

            setDataPlayer(responsePlayers.data.players)

            console.log(dataPlayer);

        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
        <h1 className='text-center mt-5'>ACAK DADU</h1>
        
        <div className='w-50 pt-3' style={{margin:"auto"}}>
            <label className='me-3'>
                User
                <input type="number"  className='ms-4' onChange={handleChange}/>
            </label>
            
            <button type='submit' onClick={handleSubmit}>
                Add
            </button>
        </div>

        {/* <div style={{margin:"auto",width:"50%"}} className='mt-3'>
            <button className='bg-info' >START</button>
        </div> */}
        
        <div className='bg-danger w-50 mt-1 p-5' 
            style={{margin:"auto",height:"400px"}} >

                

        {dataPlayer.map((item)=>{
            // console.log(item);
            return(    
                <div key={item.id} className='d-flex flex-row align-items-center '>
                    <div className='me-3'>
                        <p>{item.playerName} :</p>
                    </div>
                    <div className='me-3'>
                        <p>0</p>
                    </div>
                    <div>
                        <img  src={acak} alt="dadu" style={{width:"50px"}} className='me-3'/>
                        <img  src={acak2} alt="dadu" style={{width:"50px"}} className='me-3'/>
                        <img  src={acak3} alt="dadu" style={{width:"50px"}} className='me-3'/>
                    </div>
                </div>  
            )
        })}
        </div>
    </div>
  )
}

export default Home