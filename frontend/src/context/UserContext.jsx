import React, { createContext, useState} from 'react';
import axios from 'axios';
export const userDataContext = createContext();
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


function UserContext({children}){

    const serverUrl = "http://localhost:8000";
    const [userData, setUserData] = React.useState(null);

    const [frontendImage, setFrontendImage] = React.useState(null);
    const [backendImage, setBackendImage] = React.useState(null);
    const [selectedImage, setSelectedImage] = React.useState(null);


    const handleCurrentUser = async () => {
        try { 
            const result = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true });
            setUserData(result.data);
            console.log(result.data);

        } catch (error) {
            console.error(error);

        }
    }
const getGeminiResponse = async (command)=> {
    try {
        const result = await axios.post(`${serverUrl}/api/user/asktoassistant`,{command},{withCredentials:true})
        return result.data
    } catch (error) {
        console.log(error)
    }
}

    React.useEffect(() => {
        handleCurrentUser();
    }, []);

    const value={
        serverUrl,
        userData, 
        setUserData,
        backendImage,
        setBackendImage,
        frontendImage,
        setFrontendImage,
        selectedImage,
        setSelectedImage,
        getGeminiResponse
    }
    return(
        <div>
            <userDataContext.Provider value={value}>
         {children}
            </userDataContext.Provider>
           
        </div>

    )


}

export default UserContext;