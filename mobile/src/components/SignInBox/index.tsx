import { View } from "@motify/components";
import React from "react";
import { COLORS } from "../../theme";
import { Button } from "../Button";

import { styles } from "./styles"

export function SignInBox() {
  return (
    <View style={styles.container}>

      <Button 
        title="ENTRAR COM O GITHUB" 
        color={COLORS.BLACK_PRIMARY} 
        backgroundColor={COLORS.YELLOW}
        iconName="github"
      />

    </View>
  )
}
