import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";

import { api } from "../../services/api";
import { MessageProps } from "../Message";
import { Message } from "../Message";

import { styles } from "./styles";



export function MessageList() {
  const [ messages, setMessages ] = useState<MessageProps[]>([])


  useEffect(() => {
    api.get<MessageProps[]>("messages/last3").then(response => {
      const dataFiltered = response.data.map(message => {
        return {
          id: message.id,
          text: message.text,
          user: {
            name: message.user.name,
            avatar_url: message.user.avatar_url
          }
        }
      })

      setMessages(dataFiltered)
    })
  }, [])

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="never">
      {messages?.map(message => (
        <Message key={message.id} data={message} />
      ))}
    </ScrollView>
  )
}
