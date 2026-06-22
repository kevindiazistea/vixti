import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import colors from "../theme/colors";

interface Props extends TextInputProps {
  label?: string;
}

export default function Input({ label, style, ...props }: Props) {
  return (
    <View style={{ marginBottom: 15 }}>
      {label && (
        <Text style={styles.label}>
          {label}
        </Text>
      )}

      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={colors.textSecondary}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: colors.textSecondary,
    marginBottom: 6,
    fontSize: 15,
    fontWeight: "500",
  },
  input: {
    backgroundColor: colors.card,
    color: colors.text,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 16,
  },
});
