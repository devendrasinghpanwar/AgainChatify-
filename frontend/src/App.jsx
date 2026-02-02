
import React from 'react'
import {Route,Routes} from 'react-router';
import ChatPage from './components/pages/ChatPage.jsx'
import LoginPage from './components/pages/LoginPage.jsx'
import SignUp from './components/pages/SignUp.jsx'
import { useAuthStore } from './store/useAuthStore.js';

function App() {

  const {authUser,isLoading,login} =useAuthStore();
  console.log(authUser);
  console.log(isLoading);
  console.log(login);
  return ( 
    <div className='min-h-screen bg-state-900 relative flex items-center justify-center p-4 overflow-hidden'>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient ( to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"/>
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]"/>
      <div className='absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]'/>     
     <Routes>
      <Route path='/' element={<ChatPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignUp/>}/>
     </Routes>
     </div>
  )
}

export default App