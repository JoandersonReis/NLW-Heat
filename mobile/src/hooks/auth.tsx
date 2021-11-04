import React, { createContext, ReactNode, useContext, useState } from "react";


type User = {
  id: number,
  avatar_url: string,
  name: string,
  login: string
}

type AuthContextData = {
  user: User | null,
  isSigningIng: boolean,
  signIn: () => Promise<void>,
  signOut: () => Promise<void>
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)


function AuthProvider({ children }: AuthProviderProps) {
  const [ isSigningIng, setIsSigningIng ] = useState(false)
  const [ user, setUser ] = useState<User | null>(null)
  

  async function signIn() {

  }

  async function signOut() {

  }


  return (
    
    <AuthContext.Provider value={{
      user,
      isSigningIng,
      signIn,
      signOut
    }}>
      {children}
    </AuthContext.Provider>

  )

}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}


export { useAuth, AuthProvider }
