import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../theme/colors";

type ButtonProps = {
  title: string;
  onPress: () => void;
  color?: string;
};

export default function Button({ title, onPress }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
