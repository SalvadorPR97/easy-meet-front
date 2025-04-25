import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dateNotInThePastValidator(): any {
  return (control: AbstractControl): ValidationErrors | null => {
    const today = new Date();
    // Establecemos la hora, minutos, segundos y milisegundos a 0 para solo comparar la fecha
    today.setHours(0, 0, 0, 0);

    const inputDate = new Date(control.value);
    inputDate.setHours(0, 0, 0, 0); // Igual que con `today`, eliminamos la hora, minutos, segundos y milisegundos

    // Si la fecha ingresada es anterior a hoy, retornamos un error
    if (inputDate < today) {
      return { dateInThePast: true };
    }

    return null; // Si no hay error, la fecha es válida
  };
}
