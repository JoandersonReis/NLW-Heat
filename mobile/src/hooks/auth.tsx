import axios from "axios";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { authorize, AuthorizeResult } from "react-native-app-auth"
import { api } from "../services/api";

let CLIENT_SECRET = "e5fc9f001a33928e4ea0739ed43f50aa84bcbcf0"
let CLIENT_ID = "2bb23337fab7032bed49"

type User = {
  id: number,
  avatar_url: string,
  name: string,
  login: string
}

type AuthContextData = {
  user: User | null,
  isSigningIn: boolean,
  signIn: () => Promise<void>,
  signOut: () => Promise<void>
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)


function AuthProvider({ children }: AuthProviderProps) {
  const [ isSigningIn, setIsSigningIn ] = useState(false)
  const [ user, setUser ] = useState<User | null>(null)
  const [ code, setCode ] = useState("")

  async function signIn() {
    setIsSigningIn(true)

    const config = {
      redirectUrl: 'com.nlwheat.mobile://oauthredirect',
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      scopes: ['identity'],
      additionalHeaders: { 'Accept': 'application/json' },
      skipCodeExchange: true,
      serviceConfiguration: {
        authorizationEndpoint: 'https://github.com/login/oauth/authorize',
        tokenEndpoint: 'https://github.com/login/oauth/access_token',
        revocationEndpoint:
          `https://github.com/settings/connections/applications/${CLIENT_ID}`
      }
    }

    try {
      const result = await authorize(config)

      if(result && result.authorizationCode) {
        setCode(result.authorizationCode)
      }

      setIsSigningIn(false)
    } catch(err) {
      console.log(err)
    }
  }

  async function signOut() {

  }


  return (
    
    <AuthContext.Provider value={{
      user,
      isSigningIn,
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
