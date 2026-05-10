import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { loginUsuario } from "../storage/auth";

type Props = NativeStackScreenProps<any>;

export default function LoginScreen({ navigation }: Props) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const ok = await loginUsuario(usuario, password);

    if (!ok) {
      Alert.alert("Error", "Usuario o contraseña incorrectos");
      return;
    }
  navigation.reset({
    index: 0,
    routes: [{ name: "Home" }],
  });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={usuario}
        onChangeText={setUsuario}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Ingresar" onPress={handleLogin} />

      <View style={{ marginTop: 20 }}>
        <Button
          title="Crear cuenta"
          onPress={() => navigation.navigate("Registro")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 12,
    borderRadius: 5,
  },
});
