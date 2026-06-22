export function validateTaskInput(titulo: string, descripcion: string) {
  const errors: string[] = [];

  if (!titulo || titulo.trim() === "") {
    errors.push("El título es requerido");
  }

  if (!descripcion || descripcion.trim() === "") {
    errors.push("La descripción es requerida");
  }

  return errors;
}
