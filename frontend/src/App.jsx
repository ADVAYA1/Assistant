import React from 'react';
import { Routes, Route , Navigate} from 'react-router-dom';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Customize from './pages/Customize.jsx';
import { userDataContext } from './context/userContext.jsx';
import Home from './pages/Home.jsx';
import Customize2 from './pages/Customize2.jsx';


function App() { 
  
  const {userData,setUSerData} = React.useContext(userDataContext);
  
  return (
   <>
   
  <Routes>

    <Route path="/" element={ (userData?.user?.assistantImage && userData?.user?.assistantName)? <Home/> : <Navigate to={"/customize"} />}/>
    <Route path="/signin" element={ !userData ? <SignIn /> : <Navigate to={"/"} />}/>
    <Route path="/signup" element={ !userData ? <SignUp /> : <Navigate to={"/"} />}/>

    <Route path="/customize" element={ userData ? <Customize /> : <Navigate to = {"/signup"} />} />
    
      <Route path="/customize2" element={ userData ? <Customize2 /> : <Navigate to = {"/signup"} />} />

  </Routes>
  </> 
    
  );
}

export default App;