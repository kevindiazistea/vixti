import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddTaskScreen from '../screens/AddTaskScreen';
import CompletadasScreen from '../screens/CompletadasScreen';
import EliminadasScreen from '../screens/EliminadasScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegistroScreen from '../screens/RegistroScreen';
import TareasScreen from '../screens/TareasScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registro" component={RegistroScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Tareas" component={TareasScreen} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} />
        <Stack.Screen name="Completadas" component={CompletadasScreen} />
        <Stack.Screen name="Eliminadas" component={EliminadasScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
