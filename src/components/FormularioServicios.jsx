import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const TIPO_SERVICIOS = [
  "Acompañamiento",
  "Alimentación",
  "Construcción",
  "Cuidado Personal",
  "Desarrollo Comunitario",
  "Peluquería",
  "Psicología",
  "Recreación",
  "Refugio y/o Albergue",
  "Salud",
  "Tecnología",
  "Transporte",
  "Otros (Especifique en descripción)",
];

const FormularioVisita = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTipoServicio, setSelectedTipoServicio] = useState("");
  const form = useRef();

  const initialState = {
    user_name: "",
    user_rut: "",
    user_correo: "",
    user_numero: "",
    user_servicio: "",
    message: "",
  };
  const [formData, setFormData] = useState(initialState);

  const alerta = (icon, title, text) => {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validarRutChileno = (rut) => {
    const rutLimpio = rut.replace(/[\.\-]/g, '');
    const rutArray = rutLimpio.split('');
    const rutNumero = rutArray.slice(0, -1).join('');
    const dv = rutArray.pop().toLowerCase();
  
    if (!/^[0-9]+$/g.test(rutNumero) || rutNumero.length < 7) {
      return false;
    }
  
    let suma = 0;
    let multiplicador = 2;
  
    for (let i = rutNumero.length - 1; i >= 0; i--) {
      suma += parseInt(rutNumero.charAt(i)) * multiplicador;
      multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }
  
    const resto = suma % 11;
    const dvEsperado = 11 - resto === 10 ? 'k' : (11 - resto).toString();
  
    return dv === dvEsperado;
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if ((formData.user_name).length < 3) {
      alerta("error", "Nombre inválido", "Vuelva a intentarlo, por favor.")
      setIsLoading(false);
    } else if (!validarRutChileno(formData.user_rut)) {
      alerta("error", "Rut inválido", "Vuelva a intentarlo, por favor.")
      setIsLoading(false);
    } else if (!isEmailValid(formData.user_correo)) {
      alerta("error", "Correo inválido", "Vuelva a intentarlo, por favor.")
      setIsLoading(false);
    } else if (!/^\d+$/.test(formData.user_numero) || formData.user_numero.length < 8) {
      alerta("error", "Número inválido", "Ingrese solo números y asegúrese de tener al menos 8 dígitos.");
      setIsLoading(false);
    } else if ((formData.message).length < 5) {
      alerta("error", "Descripción demasiado corta", "Vuelva a intentarlo, por favor.")
      setIsLoading(false);
    }
    else {
      emailjs
        .sendForm(
          "service_bpsug0l",
          "template_yg1ya76",
          form.current,
          "H-n7tIUhFRNUiIoMZ"
        )
        .then(
          (result) => {
            console.log(result.text);
            setIsLoading(false);
            setFormData(initialState);
            setSelectedTipoServicio("");
            Swal.fire({
              icon: "success",
              title: "Muchas gracias",
              text: "Su información será recibida y revisada por nuestro equipo.",
              allowOutsideClick: false,
              showConfirmButton: false,
              timer: 2500,
            });
          },
          (error) => {
            console.log(error.text);
            setIsLoading(false);
          }
        );
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "user_servicio") {
      setSelectedTipoServicio(e.target.value);
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        user_direccion: e.target.value,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <p className="text-lg text-gray-500 xl:w-1/2 py-2 px-5 rounded-lg mt-8 shadow-md shadow-blue-50">
          En este formulario puedes enviar tu información sobre alguna ayuda que
          desees realizar, como cortar el cabello, ayudar con higiene personal,
          ayudar con temas sobre la salud, etc.
        </p>
      </div>
      <form
        ref={form}
        onSubmit={sendEmail}
        className="shadow-xl shadow-orange-200 px-16 py-8 m-5 xl:w-1/3 mx-auto mt-16 rounded-lg"
      >
        <div className="flex justify-center items-center">
          <h1 className="ini-sesion text-3xl pb-3 font-bold">
            Formulario de Ayuda
          </h1>
        </div>
        <div className="flex flex-col mt-5 mx-auto">
          <label
            className="after:content-['*'] after:ml-0.5 after:text-red-500"
            htmlFor="nombre"
          >
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="user_name"
            className="border rounded-lg mb-5 py-1.5 px-2 mt-1"
            placeholder="Miles Morales"
            value={formData.user_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col mx-auto">
          <label
            htmlFor="rut"
            className="after:content-['*'] after:ml-0.5 after:text-red-500"
          >
            Rut
          </label>
          <input
            type="text"
            id="rut"
            name="user_rut"
            className="border rounded-lg mb-5 py-1.5 px-2 mt-1"
            placeholder="11.111.111-1"
            required
            maxLength="12"
            value={formData.user_rut}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mx-auto">
          <label
            htmlFor="rut"
            className="after:content-['*'] after:ml-0.5 after:text-red-500"
          >
            Correo electrónico
          </label>
          <input
            type="text"
            id="rut"
            name="user_correo"
            className="border rounded-lg mb-5 py-1.5 px-2 mt-1"
            placeholder="correo@correo.com"
            required
            value={formData.user_correo}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mx-auto">
          <label
            htmlFor="rut"
            className="after:content-['*'] after:ml-0.5 after:text-red-500"
          >
            Teléfono
          </label>
          <input
            type="text"
            id="rut"
            name="user_numero"
            className="border rounded-lg mb-5 py-1.5 px-2 mt-1"
            placeholder="1234 5678"
            required
            maxLength="9"
            value={formData.user_numero}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mx-auto">
          <label
            className="after:content-['*'] after:ml-0.5 after:text-red-500"
            htmlFor="direccion"
          >
            Tipo de ayuda
          </label>
          <input
            type="text"
            id="direccion"
            name="user_direccion"
            className="hidden"
            value={selectedTipoServicio}
          />
          <select
            id="prioridad"
            name="user_servicio"
            className="border-2 w-full p-2 mt-1 rounded-md"
            onChange={handleChange}
            value={selectedTipoServicio}
            required
          >
            <option value="">-- Seleccionar --</option>
            {TIPO_SERVICIOS.map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col mx-auto mt-5">
          <label
            className="after:content-['*'] after:ml-0.5 after:text-red-500"
            htmlFor="descripcion"
          >
            Descripción
          </label>
          <textarea
            name="message"
            id="descripcion"
            className="border rounded-lg py-1.5 px-2 resize-none h-32 mt-1"
            placeholder="Escriba más detallado su propósito..."
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col mx-auto justify-center items-center">
          {isLoading ? (
            <div className="spinner-container">
              <div className="spinner"></div>
            </div>
          ) : (
            <input
              type="submit"
              value="Enviar"
              className="btn-gradient btn-enviarForm text-white justify-center items-center py-1 w-3/12 rounded-lg mt-5 cursor-pointer text-xl"
            />
          )}
        </div>
      </form>
    </>
  );
};

export default FormularioVisita;
