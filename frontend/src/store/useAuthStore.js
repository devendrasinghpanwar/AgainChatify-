import {create} from 'zustand';

export const useAuthStore = create((set)=>({
    authUser:{name:"john",_id:123,age: 23},
    isLoading:true,

    login:()=>{
        console.log("we just logged in ");
    }
}));