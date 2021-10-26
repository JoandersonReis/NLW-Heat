import { useEffect, useState } from "react"
import { api } from "../../services/api"

import styles from "./styles.module.scss"
import logoImg from "../../assets/logo.svg"
import { io } from "socket.io-client"

type Message = {
  id: number,
  text: string,
  user: {
    name: string,
    avatar_url: string
  }
}

const messageQueue: Message[] = []

const socket = io("http://localhost:4000")

socket.on("new_message", (newMessage: Message) => {
  messageQueue.push(newMessage)
})

export function MessageList() {
  const [ messages, setMesssages ]  = useState<Message[]>([])


  useEffect(() => {
    const timer = setInterval(() => {
      if(messageQueue.length > 0) {
        setMesssages(prevState => [
          messageQueue[0],
          prevState[0],
          prevState[1]
        ].filter(Boolean))

        messageQueue.shift()
      }
    }, 3000)
  }, [])

  useEffect(() => {
    api.get("messages/last3").then(response => {
      setMesssages(response.data)
    })
  }, [])


  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DoWhile 2021" />

      <ul className={styles.messageList}>
        {messages.map(message => (
          <li className={styles.message} key={String(message.id)}>
            <p className={styles.messageContent}>{message.text}</p>

            <div className={styles.messageUser}>
              <div className={styles.userImage}>
                <img src={message.user.avatar_url} alt={message.user.name} />
              </div>
              <span>{message.user.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}