import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 36
  },
  message: {
    fontSize: 15,
    fontFamily: FONTS.REGULAR,
    color: COLORS.WHITE,
    lineHeight: 20
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8
  },
  userName: {
    marginLeft: 8,
    fontSize: 15,
    fontFamily: FONTS.REGULAR,
    color: COLORS.WHITE
  }
})