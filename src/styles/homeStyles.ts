import { StyleSheet } from "react-native";
import colors from "../theme/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: colors.primary,
  },
  button: {
    marginVertical: 10,
  },
});
