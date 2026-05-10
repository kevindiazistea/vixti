import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { cerrarSesion } from '../storage/auth';

type Props = NativeStackScreenProps<any>;

export default function HomeScreen({ navigation }: Props) {

  async function handleLogout() {
    await cerrarSesion();

    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>VIXTI</Text>

      <View style={{ marginTop: 20 }}>
        <View style={{ marginBottom: 20 }}>
          <Button title="Ver mis tareas" onPress={() => navigation.navigate("Tareas")} 
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Button title="Agregar tarea" onPress={() => navigation.navigate("AddTask")} 
          />
        </View>
        <View>
          <Button title="Cerrar sesión" color="red" onPress={handleLogout} 
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 80 },
  title: { fontSize: 26, textAlign: "center", marginBottom: 50 },
});
