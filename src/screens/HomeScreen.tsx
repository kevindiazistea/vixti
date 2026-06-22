import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import Button from "../components/Button";
import { cerrarSesion } from '../storage/auth';
import globalStyles from "../styles/globalStyles";

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
    <View style={globalStyles.screen}>
      <Text style={globalStyles.title}>VIXTI</Text>

      <View style={{ gap: 20 }}>
        <Button 
          title="Ver mis tareas" 
          onPress={() => navigation.navigate("Tareas")} 
        />

        <Button 
          title="Agregar tarea" 
          onPress={() => navigation.navigate("AddTask")} 
        />

        <Button 
          title="Completadas" 
          onPress={() => navigation.navigate("Completadas")} 
        />

        <Button 
          title="Eliminadas" 
          onPress={() => navigation.navigate("Eliminadas")} 
        />

        <Button 
          title="Cerrar sesión"
          color="red"
          onPress={handleLogout}
        />
      </View>
    </View>
  );
}
