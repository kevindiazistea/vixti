import { FlatList, Text, View } from "react-native";
import Button from "../components/Button";
import Card from "../components/Card";
import { useTasksStore } from "../store/useTasksStore";
import globalStyles from "../styles/globalStyles";
import colors from "../theme/colors";

export default function EliminadasScreen() {
  const tareas = useTasksStore(s => s.tareasEliminadas);
  const restaurar = useTasksStore(s => s.restaurarEliminada);

  return (
    <View style={globalStyles.screen}>
      <Text style={globalStyles.title}>Papelera</Text>

      <FlatList
        data={tareas}
        keyExtractor={t => t.id}
        renderItem={({ item }) => (
          <Card>
            {/* Título */}
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: colors.danger,
                marginBottom: 6,
              }}
            >
              🗑 {item.titulo}
            </Text>

            {/* Descripción */}
            {item.descripcion && (
              <Text style={{ color: colors.textSecondary, marginBottom: 10 }}>
                {item.descripcion}
              </Text>
            )}

            {/* Restaurar */}
            <Button
              title="Restaurar"
              color={colors.secondary}
              onPress={() => restaurar(item.id)}
            />
          </Card>
        )}

        ListEmptyComponent={
          <Text
            style={{
              textAlign: "center",
              marginTop: 20,
              color: colors.textSecondary,
            }}
          >
            No hay tareas eliminadas
          </Text>
        }
      />
    </View>
  );
}
