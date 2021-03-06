import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../theme";


export const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20
  },
  topBar:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  logoutText: {
    fontSize: 15,
    fontFamily: FONTS.REGULAR,
    color: COLORS.WHITE,
  }
})
