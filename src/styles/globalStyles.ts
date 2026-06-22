import { StyleSheet } from "react-native";
import colors from "../theme/colors";

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    justifyContent: "center",   // 👈 ESTA LÍNEA
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",        // 👈 para centrar títulos
  },
});
