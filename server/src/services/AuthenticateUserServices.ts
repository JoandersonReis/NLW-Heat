import axios from "axios"
import db from "../database/connection"
import { sign } from "jsonwebtoken"


interface IAccessTokenResponse {
  access_token: string
}

interface IUSerResponse {
  avatar_url: string,
  login: string,
  id: number,
  name: string
}

class AuthenticateUserService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token"

    const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
      params: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code
      },
      headers: {
        Accept: "application/json"
      }
    })


    const response = await axios.get<IUSerResponse>("https://api.github.com/user", {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`
      },
    })

    const { login, id, avatar_url, name } = response.data

    let [user] = await db("users")
      .where("users.github_id", "=", id)
      .select("*")

    if(!user) {
      [user] = await db("users").insert({
        github_id: id,
        login,
        avatar_url,
        name
      })
    }

    const token = sign(
      {
        user: {
          name: user.name,
          avatar_url: user.avatar_url,
          id: user.id
        }
      },
      process.env.JWT_SECRET,
      {
        subject: String(user.id),
        expiresIn: "1d"
      }
    )

    return {
      token,
      user
    }
  }
}

export { AuthenticateUserService }