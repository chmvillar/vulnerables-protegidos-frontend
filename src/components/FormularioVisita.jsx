import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Swal from "sweetalert2";

const FormularioVisita = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [busquedaMapa, setBusquedaMapa] = useState("");
  const [forceRender, setForceRender] = useState(false);
  
  const form = useRef();

  const initialState = {
    user_name_solicitante: "",
    user_rut_solicitante: "",
    user_name: "",
    user_rut: "",
    user_direccion: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialState);

  const alerta = (icono, titulo, mensaje) => {
    Swal.fire({
      icon: icono,
      title: titulo,
      text: mensaje,
      allowOutsideClick: false,
      showConfirmButton: false,
      timer: 2500,
    });
  }

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

    if (formData.user_name_solicitante.length < 3) {
      alerta("warning", "El NOMBRE DEL SOLICITANTE debe tener al menos 3 caracteres", "Intentelo de nuevo");
      return;
    } else if (!validarRutChileno(formData.user_rut_solicitante)) {
      alerta("error", "Rut inválido", "Vuelva a intentarlo, por favor.");
      return;
    } else if (formData.user_name.length < 3) {
      alerta("warning", "El nombre debe tener al menos 3 caracteres", "Intentelo de nuevo");
      return;
    } else if (formData.message.length < 5) {
      alerta("warning", "La descripción debe tener más de 5 caracteres", "Intentelo de nuevo");
      return;
    } else {
      setIsLoading(true);
    }
    emailjs
      .sendForm(
        "service_bpsug0l",
        "template_7gi2zjg",
        form.current,
        "H-n7tIUhFRNUiIoMZ"
      )
      .then(
        (result) => {
          console.log(result.text); 
          setIsLoading(false);
          setFormData(initialState);
          setForceRender((prev) => !prev);
          alerta("success", "Muchas gracias", "Su información será recibida y revisada por nuestro equipo.");
        },
        (error) => {
          console.log(error.text);
          setIsLoading(false);
        }
      );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <p className="text-lg text-gray-500 xl:w-1/2 shadow-md py-2 px-5 rounded-lg mt-8 shadow-blue-50">
          En este formulario puedes enviar información sobre una persona que
          conozcas en situación de vulnerabilidad, abandono o con diferentes
          necesidades.
        </p>
      </div>
      <form
        ref={form}
        onSubmit={sendEmail}
        className="shadow-lg shadow-orange-200 px-16 py-8 m-5 xl:w-1/3 mx-auto mt-16 rounded-lg"
      >
        <div className="flex justify-center items-center">
          <h1 className="ini-sesion text-3xl pb-3 font-bold">
            Formulario de Visita
          </h1>
        </div>
        <div className="flex flex-col mt-5 mx-auto">
          <p className="lg:text-lg mb-5 border-b-2 border-r-2 border-blue-200 font-bold">Información de quién Solicita Visita</p>
          <label
            className="after:content-['*'] after:ml-0.5 after:text-red-500"
            htmlFor="nombre_solicitante"
          >
            Nombre Solicitante
          </label>
          <input
            type="text"
            id="nombre_solicitante"
            name="user_name_solicitante"
            className="border rounded-lg mb-5 py-1.5 px-2"
            placeholder="Miles Morales"
            value={formData.user_name_solicitante}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col mx-auto">
          <label
            className="after:content-['*'] after:ml-0.5 after:text-red-500"
            htmlFor="rut_solicitante"
          >
            Rut Solicitante
          </label>
          <input
            type="text"
            id="rut_solicitante"
            name="user_rut_solicitante"
            className="border rounded-lg mb-5 py-1.5 px-2"
            placeholder="Miles Morales"
            value={formData.user_rut_solicitante}
            onChange={handleChange}
            required
            maxLength="12"
          />
        </div>
        <div className="flex flex-col mx-auto">
          <p className="lg:text-lg mb-5 mt-5 border-b-2 border-r-2 border-blue-200 font-bold">Información de quien necesita una Visita</p>
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
            className="border rounded-lg mb-5 py-1.5 px-2"
            placeholder="Miles Morales"
            value={formData.user_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col mx-auto">
          <label htmlFor="rut">Rut <span className="text-gray-400">(opcional)</span></label>
          <input
            type="text"
            id="rut"
            name="user_rut"
            className="border rounded-lg mb-5 py-1.5 px-2"
            placeholder="11.111.111-1"
            value={formData.user_rut}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mx-auto">
          <label
            className="after:content-['*'] after:ml-0.5 after:text-red-500"
            htmlFor="direccion"
          >
            Dirección
          </label>
          <input
            type="text"
            id="direccion"
            name="user_direccion"
            className="hidden"
            value={busquedaMapa.label}
          />
          <GooglePlacesAutocomplete
            id="direccion"
            apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
            value={busquedaMapa}
            key={forceRender}
            required
            selectProps={{
              busquedaMapa,
              onChange: setBusquedaMapa,
              placeholder: "Municipalidad Isla de Maipo",
              required: true
            }}
            autocompletionRequest={{
              componentRestrictions: {
                country: ["cl"],
              },
            }}
          />
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
            className="border rounded-lg py-1.5 px-2 resize-none h-32 "
            placeholder="Escriba más detallada su solicitud de visita..."
            required
            value={formData.message}
            onChange={handleChange}
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
