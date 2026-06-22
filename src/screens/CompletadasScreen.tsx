import { FlatList, Text, View } from "react-native";
import Card from "../components/Card";
import { useTasksStore } from "../store/useTasksStore";
import globalStyles from "../styles/globalStyles";
import colors from "../theme/colors";

export default function CompletadasScreen() {
  const tareas = useTasksStore(s => s.tareasCompletadas);

  return (
    <View style={globalStyles.screen}>
      <Text style={globalStyles.title}>Tareas Completadas</Text>

      <FlatList
        data={tareas}
        keyExtractor={t => t.id}
        renderItem={({ item }) => (
          <Card>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: colors.text,
                textDecorationLine: "line-through",
                opacity: 0.7,
              }}
            >
              ✔ {item.titulo}
            </Text>

            {item.descripcion && (
              <Text
                style={{
                  color: colors.textSecondary,
                  marginTop: 4,
                  opacity: 0.6,
                }}
              >
                {item.descripcion}
              </Text>
            )}
          </Card>
        )}

        ListEmptyComponent={
          <Text
            style={{
              textAlign: "center",
              marginTop: 20,
              color: colors.textSecondary,
              opacity: 0.6,
            }}
          >
            No hay tareas completadas
          </Text>
        }
      />
    </View>
  );
}
