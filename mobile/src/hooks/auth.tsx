import axios from "axios";
import React, { createContext, ReactNode, useContext, useState } from "react";
import OAuthManager from "react-native-oauth"
import { api } from "../services/api";

let CLIENT_SECRET = "c33e85f7d71cc5a8dca0dd70f74a868c43c3bd9e"
let CLIENT_ID = "b88e1e5badce220f6691"

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
  const manager = new OAuthManager("NLW Heat")
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${CLIENT_ID}`

  async function signIn() {

    manager.configure({
      github: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        callback_url: "http://localhost/github"
      }
    })

    manager.authorize("github", {scopes: "user"}).then((response: any) => {
    })
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
