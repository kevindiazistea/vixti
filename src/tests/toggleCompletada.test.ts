import { useTasksStore } from "../store/useTasksStore";

describe("toggleCompletada", () => {
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

  it("marca una tarea como completada si estaba pendiente", () => {
    useTasksStore.setState({
      tareas: [
        {
          id: "1",
          titulo: "Test",
          descripcion: "",
          completada: false,
          recordatorio: recordatorioBase
        }
      ],
      tareasCompletadas: [],
      tareasEliminadas: []
    });

    useTasksStore.getState().toggleCompletada("1");

    const state = useTasksStore.getState();
    const tarea = state.tareasCompletadas.find(t => t.id === "1");

    expect(tarea).toBeDefined();
    expect(tarea!.completada).toBe(true);
  });

  it("desmarca una tarea si estaba completada", () => {
    useTasksStore.setState({
      tareas: [],
      tareasCompletadas: [
        {
          id: "1",
          titulo: "Test",
          descripcion: "",
          completada: true,
          recordatorio: recordatorioBase
        }
      ],
      tareasEliminadas: []
    });

    useTasksStore.getState().toggleCompletada("1");

    const state = useTasksStore.getState();
    const tarea = state.tareas.find(t => t.id === "1");

    expect(tarea).toBeDefined();
    expect(tarea!.completada).toBe(false);
    expect(state.tareasCompletadas.find(t => t.id === "1")).toBeUndefined();
  });
});
