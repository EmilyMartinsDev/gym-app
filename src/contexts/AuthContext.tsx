import { createContext, useState, ReactNode } from "react";
import { destroyCookie, setCookie  } from 'nookies'

import { api } from "../services/apiClient";
import { redirect } from "react-router-dom";


interface AuthContextData {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signUp: (credentials: SignUpProps) => Promise<void>;
    logoutUser: () => Promise<void>;
  }
interface UserProps {
    id: string
    nome: string
    email: string
    subscriptions?: SubscriptionProps | null
}

interface SubscriptionProps{
    id: string
    status: string
}

type AuthProviderProps = {
    children : ReactNode

}

interface SignInProps {
    email: string;
    senha: string;
  }
  
  interface SignUpProps{
    // id:string,
    // usuarioId:string,
    // usuario:{
    //     name: string;
    //     email: string;
    //     senha: string;
    //     acesso:string
    // }
        nome: string;
        email: string;
        senha: string;
 
  }
  

export const AuthContext = createContext({}as  AuthContextData)

export function signOut(){
    try{

        destroyCookie(null, '@barberWeb', { path: "/" })
        redirect('/login')

    }catch(err){
        console.log(err)
    }
}

export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user

    async function signIn ({email, senha}: SignInProps){
       try{
        const response = await api.post("/usuario", {
            email, 
            senha
        })

        const {...data } = response.data

        setCookie(null, '@barberWeb', data.token, {
            maxAge: 60 * 60 * 24 * 30,
            path: "/"
        });

        setUser({
          ...data
        });
    
        api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`

        redirect("/dashboard")
        
       }catch(err){
        console.log("erro ao entrar",err)
       }
    
    }
 
       async function logoutUser(){
        try{
          destroyCookie(null, '@barberWeb', { path: '/' })
          redirect('/login')
          setUser(null);
        }catch(err){
          console.log("ERRO AO SAIR", err)
        }
      }
    
    
    async function signUp({ nome, email, senha}: SignUpProps){
        try{
          const response = await api.post('/barbearia', {
            nome,
            email,
            senha
          })
    
          redirect('/login')
    
        }catch(err){
          console.log(err);
        }
      }
      
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp, logoutUser  }}>
            {children}
        </AuthContext.Provider>
    )
    }
