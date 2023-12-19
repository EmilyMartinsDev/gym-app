import { createContext, ReactNode, useState, useEffect } from "react";
import {destroyCookie} from 'nookies'
import { api } from "../services/apiClient"
import { setCookie, parseCookies } from "nookies";

import {toast } from 'react-toastify'
import { Router, useNavigate } from "react-router-dom";
type AuthContextData ={
    user?: UserProps;
    isAuthenticated: boolean;
    signin: (credentials: SignInProps)=> Promise<void>;
    signOut: ()=> void;
    signUp: (credentials: SignUpProps)=> Promise<void>
 }

type  UserProps = {
    id: string;
    name: string;
    email: string;
    subscription?:any,
    info?:{
        userId:string
         id    :string              
         name  :string               
       
         weight     :number          
         height   :number      
         gender:'F' | 'M'      
         age:number  
       
         body_fat_percentage   :number
         goal :string                 
         training_time      :number   
         muscle_group_target :string 
             
         activity_level: number      
         training_frequency:number   
         level?:string
        
       }

}

type SignInProps = {
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

type  SignUpProps = {
    name: string;
    email: string;
    password: string;
}



export const AuthContext = createContext({} as AuthContextData);


export function signOut(){
    
    try{
        destroyCookie(undefined, '@nextauth.token');
        window.history.pushState({}, "", "/");
    }catch{
        console.log('erro ao deslogar')
    }
}


export function AuthProvider({children}:AuthProviderProps){
    


    const [user, setUser] = useState<UserProps> ()
    const isAuthenticated = !!user


    useEffect(()=>{
        const {"@nextauth.token": token} = parseCookies()
        if(token){
            api.get('/user/me').then(res=>{
                const {email, name, id, info} = res.data

                setUser({
                    id, email, name, info
                })
            })
            .catch(() =>{
                signOut()
            })
        }
    },[])






   async function signin({email, password}: SignInProps){
      try{
        const response = await api.post('/user/session', {
            email, password
           
        });

        const {id, name, token, info} = response.data

        setCookie(undefined, '@nextauth.token', token, {

            maxAge: 60 * 60 * 24 ,
            path: '/' // todos os caminhos tem acesso ao cookie
        } );


        setUser({
            id, name, email
        })
        


        api.defaults.headers['Authorization'] = `Bearer ${token}`
     

     

      }catch{
        toast.error('erro ao acessar')
        console.log('erro ao acessar')
      
      }
    }


    async function signUp({name, email, password}: SignUpProps){
        try{
            const response = await api.post('/user', {
                name, email, password
            });
     

        }catch(e){
            toast.error('erro ao cadastrar')
            console.log('erro ao cadastrar',e )
        }
    }


    return(
        <AuthContext.Provider value={{user, isAuthenticated, signin, signOut, signUp}}>
            {children}
        </AuthContext.Provider>
    )
}