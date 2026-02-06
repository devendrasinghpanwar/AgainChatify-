import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-hot-toast';
import axios from 'axios';

export const useAuthStore = create((set)=>({
  authUser:null,
  isCheckingAuth:true,
  
  checkAuth:async()=>{
    try {
        const res = await axiosInstance.get("/auth/check");
        set({authUser:res.data});
        
    } catch (error) {
       console.log("Error in authCheck:",error);
       set({authUser:null});
    } finally{
        set({isCheckingAuth:false});
    }
  }
, 


  signup:async(data)=>{
    set({isSignUp:true});
    try {
       const  res = await axiosInstance.post("/auth/signup",data); // inside res, post the data (name, email , password)
       set({authUser:res.data});  
       toast.success("  Account created successfully") ;

    } catch (error) {
      toast.error(error.response.data.message); 
    }finally{
      set({isSignUp:false});
    }
  },

login: async (data) =>{
  // post the data inside the loign point 
  set({isLogin:true});
  try {
  const res = await axiosInstance.post("/auth/login",data); // we posted the login data into databse 
  set({authUser:res.data,isLogin:false}); 
  toast.success("Logged in Successfuly")
  return true;

  } catch (error) { 
    toast.error(error.response.data.message);
    set({isLogin:false});
    return false;
  } 

  
}
,
logout:async()=>{
  // functionanlity of logging out 
  try {
     await axiosInstance.post("/auth/logout") ;
     set({authUser:null}); // set authUser is null 
     toast.success("Logged Out  succuessFully"); 
  } catch (error) {
   toast.error("Error Logging out ");
   console.error("Logout Error",error);
  }
}

}));

