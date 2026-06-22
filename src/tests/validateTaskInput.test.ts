import { validateTaskInput } from "../validators/validateTaskInput";

describe("validateTaskInput", () => {
  it("retorna array vacío cuando título y descripción son válidos", () => {
    const errors = validateTaskInput("Comprar pan", "Ir a la panadería");
    expect(errors).toHaveLength(0);
    expect(errors).toEqual([]);
  });

  it("retorna error si el título está vacío", () => {
    const errors = validateTaskInput("", "Descripción válida");
    expect(errors).toContain("El título es requerido");
  });

  it("retorna error si la descripción está vacía", () => {
    const errors = validateTaskInput("Título válido", "");
    expect(errors).toContain("La descripción es requerida");
  });

  it("retorna ambos errores si título y descripción son inválidos", () => {
    const errors = validateTaskInput("", "");
    expect(errors).toHaveLength(2);
    expect(errors).toContain("El título es requerido");
    expect(errors).toContain("La descripción es requerida");
  });
});
