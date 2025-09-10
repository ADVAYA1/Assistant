import React, { useContext, useEffect, useRef, useState } from 'react';
import { userDataContext } from '../Context/userContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BiMenuAltRight } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import aiImg from "../assets/ai.gif"
import userImg from "../assets/user.gif"
import ParticlesBackground from "../components/ParticlesBackground.jsx";


function Home() {

    const { userData, serverUrl, setUserData, getGeminiResponse } = React.useContext(userDataContext);
    const navigate = useNavigate();
    const [listening, setListening] = useState(false)
    const [userText, setUserText] = useState("")
    const [aiText, setAiText] = useState("")

    const isSpeakingRef = useRef(false)
    const recognitionRef = useRef(null)
    const [ham, setHam] = useState(false)
    const isRecognizingRef = useRef(false)
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : null

    const handleLogout = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
            setUserData(null);
            navigate("/signin");


        } catch (error) {
            setUserData(null);
            console.log("Logout error:", error);

        }

    }

    

    const startRecognition = () => {

        if (!isSpeakingRef.current && !isRecognizingRef.current) {
            try {
                recognitionRef.current?.start();
                console.log("Recognition requested to start");


            } catch (error) {
                if (!error.name !== "InvalidStateError") {
                    console.error("Start error: ", error);
                }
            }
        }

    }

    const speak = (text) => {
        const utterence = new SpeechSynthesisUtterance(text)

        utterence.lang = 'hi-IN';
        const voices = window.speechSynthesis.getVoices()
        const hindiVoice = voices.find(v => v.lang === 'hi-IN');
        if (hindiVoice) {
            utterence.voice = hindiVoice;
        }

        isSpeakingRef.current = true
        utterence.onend = () => {
            setAiText("")
            isSpeakingRef.current = false
            setTimeout(() => {
                startRecognition();
            }, 800);

        }
        synth.cancel();
        synth.speak(utterence)
    }

    const handleCommand = (data) => {
        const { type, userInput, response } = data
        speak(response)

        if (type == 'google-search') {
            const query = encodeURIComponent(userInput);
            window.open(`https://www.google.com/search?q=${query}`, '_blank');
        }

        if (type == 'calculator-open') {

            window.open(`https://www.google.com/search?q=calculator`, '_blank');
        }

        if (type == 'instagram-open') {

            window.open(`https://www.instagram.com/`, '_blank');
        }

        if (type == 'facebook-open') {

            window.open(`https://www.facebook.com/`, '_blank');
        }

        if (type == 'weather-show') {

            window.open(`https://www.google.com/search?q=weather`, '_blank');
        }

        if (type == 'youtube-search' || type == 'youtube-play') {
            const query = encodeURIComponent(userInput);
            window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
        }



    }


    useEffect(() => {
        const SpeechRecognition = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null;
        if(!SpeechRecognition){
            setAiText("Speech recognition unsupported in this browser. Please use Chrome or Edge.")
            return;
        }

        const recognition = new SpeechRecognition()

        recognition.continuous = true;
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        recognitionRef.current = recognition

        let isMounted = true;

        const startTimeout = setTimeout(() => {
            if (isMounted && !isSpeakingRef.current && !isRecognizingRef.current) {
                try {
                    recognition.start();
                    console.log("Recognition requested to start");
                } catch (e) {
                    if (e.name !== "InvalidStateError") {
                        console.error(e);
                    }

                }
            }
        }, 1000);

        recognition.onstart = () => {
            console.log("Recognition Started");
            isRecognizingRef.current = true;
            setListening(true);
        };

        recognition.onend = () => {

            isRecognizingRef.current = false;
            setListening(false);
            if (isMounted && !isSpeakingRef.current) {
                setTimeout(() => {
                    if (isMounted) {
                        try {
                            recognition.start();
                            console.log("Recognition restarted");
                        } catch (e) {
                            if (e.name !== "InvalidStateError") {
                                console.error(e);
                            }

                        }
                    }
                }, 1000);
            }
        };

        recognition.onerror = (event) => {
            console.warn("Recognition error: ", event.error);
            isRecognizingRef.current = false;
            setListening(false);
            if (event.error !== "aborted" && isMounted && !isSpeakingRef.current) {
                setTimeout(() => {
                    if (isMounted) {
                        try {
                            recognition.start();
                            console.log("Recognition restarted after error");
                        } catch (e) {
                            if (e.name !== "InvalidStateError") console.error(e);
                        }
                    }

                }, 1000);
            }

        };

        recognition.onresult = async (e) => {
            const transcript = e.results[e.results.length - 1][0].transcript.trim()
            console.log("Heard:" + transcript)

            if (transcript.toLowerCase().includes(userData?.user?.assistantName.toLowerCase())) {
                setAiText("")
                setUserText(transcript)
                recognition.stop()
                isRecognizingRef.current = false
                setListening(false)
                const data = await getGeminiResponse(transcript)
                console.log(data)
                handleCommand(data)
                setAiText(data.response)
                setUserText("")

            }

        };

        try{
            const greeting = new SpeechSynthesisUtterance(`Namaste ${userData?.user?.name}, main aapki sahayata ke liye taiyaar hoon.`);
            greeting.lang = 'hi-IN';
            window.speechSynthesis?.speak(greeting);
        }catch(e){
            // ignore speech errors
        }

        return () => {
            isMounted = false;
            clearTimeout(startTimeout);
            recognition.stop()
            setListening(false)
            isRecognizingRef.current = false

        };


    }, []);

   //gerterter


    return (
        <div className=' w-full h-[100vh] relative flex justify-center items-center flex-col gap-[15px] overflow-hidden'>
            <ParticlesBackground variant="home" />
            <BiMenuAltRight className='lg:hidden text-white absolute top-[20px] right-[20px] w-[25px] h-[25px]' onClick={() => setHam(true)} />
            <div className={`absolute lg:hidden top-0 w-full h-full bg-[#00000053] backdrop-blur-lg p-[20px] flex flex-col gap-[20px] items-start ${ham ? "translate-x-0" : "translate-x-full"} transition-transform`}>
                <RxCross1 className='text-white absolute top-[20px] right-[20px] w-[25px] h-[25px]' onClick={() => setHam(false)} />
                <button className='min-w-[150px] h-[60px] bg-white text-blue rounded-full text-[10px] font-semibold hover:bg-blue-600 transition duration-300 cursor-pointer' onClick={handleLogout} >Logout</button>
                <button className='min-w-[150px] h-[60px] bg-white text-blue rounded-full text-[10px] font-semibold hover:bg-blue-600 transition duration-300 cursor-pointer' onClick={() => navigate("/customize")} > Customize Your Assistant </button>

                

                <div className='w-full h-[2px] bg-gray-400'></div>
                <h1 className='text-white font-semibold text-[19px] '> History</h1>
                <div className='w-full h-[400px] gap-[20px] overflow-y-auto flex flex-col '>
                    {userData?.user?.history?.map((his) => (
                        <span className='text-gray-200 text-[180px] truncate'>{his}</span>
                    ))}
                </div>
            </div>

            <button className='mt-[30px] min-w-[150px] h-[60px] bg-white text-blue rounded-full text-[10px] font-semibold hover:bg-blue-600 absolute hidden lg:block top-[1px] right-[20px] transition duration-300 cursor-pointer' onClick={handleLogout} >Logout</button>
            <button className='mt-[30px] min-w-[150px] h-[60px] bg-white text-blue rounded-full text-[10px] font-semibold hover:bg-blue-600 absolute hidden lg:block top-[1px] px-[20px] py-[10px] left-[20px] transition duration-300 cursor-pointer' onClick={() => navigate("/customize")} > Customize Your Assistant </button>

            <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg '>

                <img src={userData?.user?.assistantImage} alt="Assistant" className=' h-full object-cover' />

            </div>

            <h1 className='text-white text-[18px] font-semibold'>I'm  {userData?.user?.assistantName}</h1>

            {!aiText && <img src={userImg} alt="" className='w-[200px]' />}
            {aiText && <img src={aiImg} alt="" className='w-[200px]' />}

            <h1 className='text-white text-[18px] font-semibold text-wrap'>{userText ? userText : aiText ? aiText : null}</h1>
        </div>
    )
}
export default Home;