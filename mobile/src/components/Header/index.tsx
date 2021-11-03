import React from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"

import { UserPhoto } from "../UserPhoto"

import logoImg from "../../assets/logo.png"


import { styles } from "./styles"

export function Header() {
  return (
    <View style={styles.container}>
      <Image source={logoImg} />


      <View style={styles.topBar}>
        <TouchableOpacity>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>

        <UserPhoto imageUri="https://github.com/JoandersonReis.png" />
      </View>
    </View>
  )
}

