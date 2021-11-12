import React from "react";
import { ColorValue, TouchableOpacity, TouchableOpacityProps, Text, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"


import { styles } from "./styles";


type Props = TouchableOpacityProps & {
  title: string,
  color: ColorValue,
  backgroundColor: ColorValue,
  iconName?: string,
  isLoading?: boolean
}

export function Button({ title, color, backgroundColor, iconName, isLoading = false, ...rest }: Props ) {
  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor }]}
      activeOpacity={0.7}
      {...rest} 
    > 
      {isLoading? 
        <ActivityIndicator color={color} /> 
        :
        <>
          {iconName && 
            <Icon name={iconName} size={24} color={color} />
          }
          <Text style={[styles.title, { color }]}>{title}</Text>

        </>  
      }
    </TouchableOpacity>
  )
}
