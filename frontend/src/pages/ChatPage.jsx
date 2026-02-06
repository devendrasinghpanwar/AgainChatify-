import React from 'react'
import { useAuthStore } from '../store/useAuthStore';
function ChatPage() {
const { logout } = useAuthStore();
console.log(logout);
  return (

    <div className='z-10'>
      <button onClick={logout}>
        LogOut
      </button>
    </div>
  )
}

export default ChatPage;