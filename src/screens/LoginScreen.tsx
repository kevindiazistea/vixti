import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from "react";
import { Alert, Text, View } from "react-native";
import Button from "../components/Button";
import Input from '../components/Input';
import { loginUsuario } from "../storage/auth";
import globalStyles from "../styles/globalStyles";

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
    <View style={globalStyles.screen}>
      <Text style={globalStyles.title}>Iniciar Sesión</Text>

      <Input
        placeholder="Usuario"
        value={usuario}
        onChangeText={setUsuario}
      />

      <Input
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
