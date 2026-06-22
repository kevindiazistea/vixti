import formatText from "../components/formatText";

describe("formatText", () => {
  it("capitaliza correctamente con reglas profesionales", () => {
    expect(formatText("river plate")).toBe("River Plate");
    expect(formatText("la banda del millo")).toBe("La Banda del Millo");
    expect(formatText("los pibes de zona norte")).toBe("Los Pibes de Zona Norte");
  });
});
