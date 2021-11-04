import { StyleSheet } from "react-native";
import { COLORS } from "../../theme";

export const styles = StyleSheet.create({
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: COLORS.BLACK_SECONDARY
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  }
})