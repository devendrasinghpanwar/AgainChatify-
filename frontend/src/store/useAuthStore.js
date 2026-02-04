import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-hot-toast';

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
       toast.success("Accounte created successfully") ;

    } catch (error) {
      toast.error(error.response.data.message); 
    }finally{
      set({isSignUp:false});
    }
  }
}));