"use client";

import { useContext, createContext, useState, useEffect } from "react";
import React from "react";
import { getUser } from "@/appwrite/appwrite";

interface GlobalContextType {
    isLogged: boolean;
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
    loading: boolean;
}

const GlobalContext = createContext<GlobalContextType | null>(null);

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children } :  { children: React.ReactNode} ) => {

    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
        getUser().then((res) => {
            
            if (res) {
                setIsLogged(true);
                setUser(res);
            }
            else{
                setIsLogged(false);
                setUser(null);
            }
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setLoading(false);
        });
        
    }, []);

  return <GlobalContext.Provider value={{user, setUser, setIsLogged, isLogged, loading}}>
                    {children}
        </GlobalContext.Provider>;
};
