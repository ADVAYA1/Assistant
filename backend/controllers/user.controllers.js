import User from '../models/user.model.js';
import uplodOnCloudinary  from '../config/cloudinary.js';
import geminiResponse from '../gemini.js';
import moment from "moment";
import { response } from 'express';



export const getCurrentUser = async (req, res) => {

    try {
        const userId = req.userId;

        const user =  await User.findById(userId).select("-password");
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        return res.status(200).json({ user });


    } catch (error) {

        console.log(error);
        return res.status(400).json({ message: "get current user error" });    
        
    }
}

export const updateAssistant = async (req, res) => {

    try {
        const {assistantName} = req.body;
        let assistantImage="";

        if(req.file) {
            assistantImage = await uplodOnCloudinary(req.file.path);
        } 
        else{
            const { imageUrl } = req.body;
            assistantImage = imageUrl;
        }  
        const user = await User.findByIdAndUpdate(req.userId, {
            assistantName,
            assistantImage
        }, { new: true }) .select("-password");
        return res.status(200).json({ user });
        
        
    } catch (error) {

        return res.status(400).json({ message: "Update assistant error" });
    }

}



export const askToAssistant=async (req,res)=>{

try {

    const {command} = req.body
    const user = await User.findById(req.userId);
    user.history.push(command)
    ////////////////////////////
     user.save(); 
     //////////////////////////////////////////////////////
    const userName = user.name
    const assistantName = user.assistantName


    const result = await geminiResponse(command,assistantName,userName);

    const jsonMatch = result.match(/{[\s\S]*}/)
    if(!jsonMatch)
    {
        return res.status(400).json({ message: "Gemini response error" });
    }

    const gemResult = JSON.parse(jsonMatch[0])
    const type = gemResult.type
    switch(type){
        case  'get-date' :  
            return res.json( {
                type,
                userInput: gemResult.userInput,
                response: `current date is ${moment().format("YYYY-MM-DD")}`
            });
        case 'get-time' :
            return res.json( {
                type,
                userInput: gemResult.userInput,
                response: `current time is ${moment().format("hh:mm A")}`
            });
        case 'get-day' :
            return res.json( {
                type,
                userInput: gemResult.userInput,
                response: `Today is ${moment().format("dddd")}`
            });

        case 'get-month' :
            return res.json( {
                type,
                userInput: gemResult.userInput,
                response: `Today is ${moment().format("MMMM")}`
            });

        case 'google-search' :
        case 'youtube-search' :
        case 'youtube-play' :
        case 'general' :
        case "calculator-open" :
        case "instagram-open" :
        case "facebook-open" :
        case "weather-show" :
            return res.json({
                type,
                userInput: gemResult.userInput,
                response: gemResult.response
            });
        
            default:
                return res.status(400).json({ response: "unable to understand" });


    }
    

} catch (error) {
    
    return res.status(500).json({response: "ask assistant error"})
}
}