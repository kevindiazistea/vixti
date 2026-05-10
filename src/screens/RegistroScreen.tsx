import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { registrarUsuario } from '../storage/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

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
    <View style={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>

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

      <Button title="Registrarme" onPress={handleRegistro} />

      <View style={{ marginTop: 20 }}>
        <Button title="Volver al Login" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

export default RegistroScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});
