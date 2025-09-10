import React from "react";
import Card from '../components/Card.jsx';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';
import image5 from '../assets/image5.png';
import { RiImageAddLine } from 'react-icons/ri';
import { useRef } from 'react';
import { userDataContext } from '../Context/userContext.jsx';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardBackspace } from "react-icons/md";
import ParticlesBackground from "../components/ParticlesBackground.jsx";



function Customize() {

    const {      serverUrl,
        userData, 
        setUserData,
        frontendImage,
        setFrontendImage,
        backendImage,
        setBackendImage,
        selectedImage,
        setSelectedImage} = React.useContext(userDataContext);
     
    const navigate = useNavigate();
    const inputImage = React.useRef(null);

    const handleImage = (e) => {
        const file= e.target.files[0];

        setBackendImage(file);
        setFrontendImage(URL.createObjectURL(file));
    }
    return (
        <div className = ' w-full h-[100vh] relative flex justify-center items-center flex-col p-[20px] '>
            <ParticlesBackground variant="customize" />

            <MdKeyboardBackspace  className='absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer' onClick={()=>navigate("/")}/>   
            

            <h1 className='text-white text-[30px] mb-[40px] text-center'>  Select Your  <span className='text-blue-200'> Assistant Image </span></h1>
            <div className='w-full max-w-[900px] flex justify-center items-center flex-wrap gap-[15px]' >
                <Card image={image1}/>
                <Card image={image2}/>
                <Card image={image3}/>
                <Card image={image4}/>
                <Card image={image5}/>

            <div className = {`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-2 border-[#0a0af47e] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white flex items-center justify-center ${selectedImage == "input" ? "border-4 border-white shadow-2xl shadow-blue-950":null}`} onClick={()=>
        
                {
                     inputImage.current.click()
                     setSelectedImage("input")
                }
                }>
            
            {!frontendImage &&  <RiImageAddLine className='text-white w-[25px] h-[25px] '/> }
                
            {frontendImage && <img src={frontendImage} className='h-full object-cover'/>}

            </div>
            <input type="file" accept='image/*' ref={inputImage} hidden onChange={handleImage}/>
            </div>
            {selectedImage && 
            <button className=' cursor-pointer mt-[30px] min-w-[150px] h-[60px] bg-white text-blue rounded-full text- [18px] font-semibold hover:bg-blue-600 transition duration-300' onClick={()=>navigate("/customize2")}> Next</button>}

        
        </div>
    )

}

export default Customize; 