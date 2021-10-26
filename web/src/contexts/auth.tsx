import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";


type User = {
  id: number,
  avatar_url: string,
  name: string,
  login: string
}

type AuthContextData = {
  user: User | null,
  signInUrl: string,
  signOut: () => void
}

type AuthResponse = {
  token: string,
  user: User
}

type AuthProvider = {
  children: ReactNode
}


export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider(props: AuthProvider) {
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=d65e1b691077ab0c1f75`
  const [ user, setUser ] = useState<User | null>(null)


  async function signIn(githubCode: string) {
    const response = await api.post<AuthResponse>("authenticate", {
      code: githubCode
    })

    const { token, user } = response.data

    localStorage.setItem("@dowhile:token", token)

    api.defaults.headers.common.authorization = `Barear ${token}`

    setUser(user)
  }

  function signOut() {
    setUser(null)
    localStorage.removeItem("@dowhile:token")
  }


  useEffect(() => {
    const url = window.location.href
    const hasGithubCode = url.includes("?code=")

    if(hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split("?code=")

      window.history.pushState({}, "", urlWithoutCode)

      signIn(githubCode)
    }
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("@dowhile:token")

    if(token) {
      api.defaults.headers.common.authorization = `Barear ${token}`

      api.get<User>("profile").then(response => {
        setUser(response.data)
      })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ signInUrl, user, signOut }}>
      {props.children}
    </AuthContext.Provider>
  )
}