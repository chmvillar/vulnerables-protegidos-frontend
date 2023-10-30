import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PersonasContext = createContext();

const PersonasProvider = ({ children }) => {
  const [personas, setPersonas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerPersonasRegistradas = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
        const { data } = await clienteAxios("/personas", config);
        setPersonas(data);
      } catch (error) {
        console.log(error);
      }
    }
    obtenerPersonasRegistradas();
  }, []);

  const alerta = (icon, titulo, texto) => {
    Swal.fire({
      icon: icon,
      title: titulo,
      text: texto,
      confirmButtonColor: "#3085d6",
      allowOutsideClick: false,
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const submitPersona = async (persona) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post("/personas", persona, config);
      console.log(data);
      setTimeout(() => {
        alerta(
          "success",
          persona.nombre + " se ha registrado correctamente",
          ""
        );
        navigate("/portal/personas/");
      });
    } catch (error) {
      console.log(error);
      alerta("error", error.response.data.msg, "");
    }
  };

  return (
    <PersonasContext.Provider
      value={{
        personas,
        submitPersona,
      }}
    >
      {children}
    </PersonasContext.Provider>
  );
};

export { PersonasProvider };

export default PersonasContext;
