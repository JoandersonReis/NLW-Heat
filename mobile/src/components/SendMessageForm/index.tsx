import { View } from "@motify/components";
import React, { useState } from "react";
import { TextInput } from "react-native";

import { COLORS } from "../../theme";
import { Button } from "../Button";

import { styles } from './styles'

export function SendMessageForm() {
  const [ message, setMessage ] = useState("")
  const [ sendingMessage, setSendingMessage ] = useState(false)

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input}
        keyboardAppearance="dark"
        placeholder="Qual sua expectativa para o evento?"
        multiline
        maxLength={140}
        value={message}
        onChangeText={setMessage}
        editable={!sendingMessage}
      />

      <Button title="ENVIAR MENSAGEM" color={COLORS.WHITE} backgroundColor={COLORS.PINK} />
    </View>
  )
}
