export const formatRut = (rut) => {
  // Eliminar guiones y puntos y formatear el RUT sin el dígito verificador.
  const rutLimpio = rut.replace(/[-.]/g, "");

  if (rutLimpio.length === 0) {
    return "";
  }

  const rutNumerico = rutLimpio.slice(0, -1);
  const digitoVerificador = rutLimpio.slice(-1);

  let rutFormateado = rutNumerico.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  rutFormateado += `-${digitoVerificador}`;

  return rutFormateado;
};

export const validarRut = (rut) => {
  // Eliminar guiones y puntos para validación.
  const rutLimpio = rut.replace(/[-.]/g, "");

  if (rutLimpio.length !== 9) {
    return false; // El RUT debe tener 9 caracteres.
  }

  const rutNumerico = rutLimpio.slice(0, -1);
  const digitoVerificador = rutLimpio.slice(-1);

  let suma = 0;
  let multiplicador = 2;

  for (let i = rutNumerico.length - 1; i >= 0; i--) {
    suma += parseInt(rutNumerico[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const digitoCalculado = 11 - (suma % 11);

  if (digitoCalculado === 11) {
    return digitoVerificador === "0";
  } else if (digitoCalculado === 10) {
    return digitoVerificador === "k" || digitoVerificador === "K";
  } else {
    return digitoVerificador === digitoCalculado.toString();
  }
};
