import { useTasksStore } from "../store/useTasksStore";

describe("eliminarTarea", () => {
  beforeEach(() => {
    useTasksStore.setState({
      tareas: [],
      tareasCompletadas: [],
      tareasEliminadas: []
    });
  });

  const recordatorioBase = {
    activo: false,
    tipo: null,
    temporizador: null,
    fechaHora: null,
    diasSemana: null,
    notificationId: null
  };

  it("mueve la tarea a tareasEliminadas y la quita de tareas", () => {
    useTasksStore.setState({
      tareas: [
        {
          id: "2",
          titulo: "Eliminar",
          descripcion: "",
          completada: false,
          recordatorio: recordatorioBase
        }
      ]
    });

    useTasksStore.getState().eliminarTarea("2");

    const state = useTasksStore.getState();

    expect(state.tareas.find(t => t.id === "2")).toBeUndefined();
    expect(state.tareasEliminadas.find(t => t.id === "2")).toBeDefined();
  });
});
