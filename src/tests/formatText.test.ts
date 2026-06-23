import formatText from "../components/formatText";

describe("formatText", () => {
  it("formatea correctamente títulos de tareas reales", () => {
    expect(formatText("sacar turno en el medico")).toBe("Sacar Turno en el Medico");
    expect(formatText("entregar trabajo de apps moviles")).toBe("Entregar Trabajo de Apps Moviles");
    expect(formatText("comprar regalo para mama")).toBe("Comprar Regalo para Mama");
  });
});
