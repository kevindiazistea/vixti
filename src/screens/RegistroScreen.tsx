import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import Button from "../components/Button";
import Input from '../components/Input';
import { registrarUsuario } from '../storage/auth';
import globalStyles from "../styles/globalStyles";
import colors from "../theme/colors";

type Props = NativeStackScreenProps<any>;

const RegistroScreen = ({ navigation }: Props) => {

  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegistro() {

    if (!usuario || !password) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    await registrarUsuario(usuario, password);

    Alert.alert('Éxito', 'Usuario registrado correctamente');

    navigation.goBack();
  }

  return (
    <View style={globalStyles.screen}>

      {/* Título */}
      <Text
        style={{
          fontSize: 28,
          fontWeight: "700",
          textAlign: "center",
          color: colors.text,
          marginBottom: 40,
        }}
      >
        Crear Cuenta
      </Text>

      {/* Inputs */}
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

      {/* Botón principal */}
      <Button title="Registrarme" onPress={handleRegistro} />

      {/* Botón secundario */}
      <View style={{ marginTop: 20 }}>
        <Button
          title="Volver al Login"
          color={colors.secondary}
          onPress={() => navigation.goBack()}
        />
      </View>

    </View>
  );
};

export default RegistroScreen;
