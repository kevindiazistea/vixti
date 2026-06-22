import { StyleSheet } from "react-native";
import colors from "../theme/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
  fontSize: 28,
  fontWeight: "bold",
  marginBottom: 20,
  color: colors.primary,
  textAlign: "center",
  },
  taskItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  taskText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
  completed: {
    textDecorationLine: "line-through",
    color: colors.gray,
  },
  taskDesc: {
    fontSize: 14,
    marginTop: 5,
    color: colors.secondary,
  },
  row: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  completeButton: {
    backgroundColor: colors.success,
    padding: 10,
    borderRadius: 8,
    width: 50,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: colors.danger,
    padding: 10,
    borderRadius: 8,
    width: 50,
    alignItems: "center",
  },
});
