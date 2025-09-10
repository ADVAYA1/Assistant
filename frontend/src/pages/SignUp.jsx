import React, {useState} from 'react';

import ParticlesBackground from "../components/ParticlesBackground.jsx";


import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../Context/userContext.jsx';
import axios from 'axios';

function SignUp() { 
    
    const [showPassword, setShowPassword] = React.useState(false);
    const {serverUrl,userData,setUserData} = React.useContext(userDataContext);
    const navigate = useNavigate();

    const [name, setName] = React.useState("");
        const [loading, setLoading] = useState(false);
    
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [err,setErr] = useState("");

      const handleSignUp = async (e) => {

        e.preventDefault();
        setErr("");
        setLoading(true);
        try{

          let result = await axios.post(`${serverUrl}/api/auth/signup`, {
            name,
            email,
            password
          },
          {withCredentials: true})
          setUserData(result.data);
          setLoading(false);
          navigate("/customize");

        }
        catch(err){
            console.log(err);
            setUserData(null);
            setLoading(false);
            setErr(err?.response?.data?.message || "Sign up failed");
        }
      }



    return (
    <div className='w-full h-[100vh] bg-cover flex justify-center items-center relative overflow-hidden'>
       <ParticlesBackground variant="auth" />
       
       <form className=' w-[90%] h-[600px] max-w-[500px] bg-[#00000000] backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] px-[20px]' onSubmit={handleSignUp}>
        <h1 className='text-white text-[30px] font-semibold mb-[30px]'> Register to <span  className='text-blue-400'>Virtual Assistant</span></h1>

        <input type="text" placeholder='Enter your name' className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' required  onChange={(e)=>setName(e.target.value)} value={name}  />
 
        <input type="email" placeholder='Email' className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' required  onChange={(e)=>setEmail(e.target.value)} value={email}/>

        <div className='w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full relative' >

            <input type={showPassword ? "text": "password"} placeholder='Password' className='w-full h-full outline-none bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' required  onChange={(e)=>setPassword(e.target.value)} value={password} />

            {!showPassword && <IoEye  className='absolute top-[20px] right-[18px] text-[white] w-[25px] h-[25px] cursor-pointer' onClick={()=>setShowPassword(true)}/>}
            {showPassword && <IoEyeOff  className='absolute top-[20px] right-[18px] text-[white] w-[25px] h-[25px] cursor-pointer' onClick={()=>setShowPassword(false)}/>}

        
        
        
        </div> 
        {err.length>0 && <p className='text-red-500 text-[17px] '>
          *{err}
          </p>}

        <button className='mt-[30px] min-w-[150px] h-[60px] bg-white text-blue rounded-full text- [18px] font-semibold hover:bg-blue-600 transition duration-300'  disabled ={loading}>{loading ? "Loading...": "Sign Up" }</button>
        
       <p className ='text-[white] text-[18px] cursor-pointer ' onClick={()=>navigate("/signin")}>Already have an Account ? <span className='text-[blue] cursor-pointer'> Sign In</span></p>
       </form>
    </div>
  )
}

export default SignUp