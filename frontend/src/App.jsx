import React from 'react';
import { Routes, Route , Navigate} from 'react-router-dom';
import { Suspense } from 'react';
import { userDataContext } from './Context/userContext.jsx';
const SignIn = React.lazy(() => import('./pages/SignIn.jsx'));
const SignUp = React.lazy(() => import('./pages/SignUp.jsx'));
const Customize = React.lazy(() => import('./pages/Customize.jsx'));
const Home = React.lazy(() => import('./pages/Home.jsx'));
const Customize2 = React.lazy(() => import('./pages/Customize2.jsx'));


function App() { 
  
  const {userData} = React.useContext(userDataContext);
  
  return (
   <>
   
  <Suspense fallback={<div className='w-full h-[100vh] flex items-center justify-center text-white'>Loading...</div>}>
  <Routes>

    <Route path="/" element={ (userData?.user?.assistantImage && userData?.user?.assistantName)? <Home/> : <Navigate to={"/customize"} />}/>
    <Route path="/signin" element={ !userData ? <SignIn /> : <Navigate to={"/"} />}/>
    <Route path="/signup" element={ !userData ? <SignUp /> : <Navigate to={"/"} />}/>

    <Route path="/customize" element={ userData ? <Customize /> : <Navigate to = {"/signup"} />} />
    
      <Route path="/customize2" element={ userData ? <Customize2 /> : <Navigate to = {"/signup"} />} />

  </Routes>
  </Suspense>
  </> 
    
  );
}

export default App;