import db from "../database/connection"

class ProfileUserService {
  async execute(user_id: number) {
    const [user] = await db("users")
      .where("users.id", "=", user_id)

    return user
  }
}



export { ProfileUserService }
