import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import io from "socket.io-client";

let socket;

const PersonasContext = createContext();

const PersonasProvider = ({ children }) => {
  const [personas, setPersonas] = useState([]);
  const [persona, setPersona] = useState({});
  const [cargando, setCargando] = useState(false);
  const [modalFormNecesidad, setModalFormNecesidad] = useState(false);
  const [modalEliminarNecesidad, setModalEliminarNecesidad] = useState(false);
  const [modalEliminarAsignacion, setModalEliminarAsignacion] = useState(false);
  const [buscador, setBuscador] = useState(false);
  const [necesidad, setNecesidad] = useState({});
  const [asistente, setAsistente] = useState({});
  const [asignacion, setAsignacion] = useState({});
  const navigate = useNavigate();

  const { auth } = useAuth();

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
        };
        const { data } = await clienteAxios("/personas", config);
        setPersonas(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPersonasRegistradas();
  }, [auth]);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
  }, []);

  const alerta = (icon, titulo, texto) => {
    Swal.fire({
      icon: icon,
      title: titulo,
      text: texto,
      confirmButtonColor: "#3085d6",
      allowOutsideClick: false,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const submitPersona = async (persona) => {
    if (persona.id) {
      await editarPersona(persona);
    } else {
      await nuevaPersona(persona);
    }
  };

  const editarPersona = async (persona) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put(
        `/personas/${persona.id}`,
        persona,
        config
      );

      // Sincronizar
      const personasActualizadas = personas.map((personaState) =>
        personaState._id === data._id ? data : personaState
      );
      setPersonas(personasActualizadas);

      setTimeout(() => {
        alerta(
          "success",
          "Actualización completa",
          "Se ha modificado la información de " + persona.nombre
        );
        navigate("/portal/personas/");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const nuevaPersona = async (persona) => {
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
      setPersonas([...personas, data]);

      const nombre = persona.nombre;

      setTimeout(() => {
        alerta(
          "success",
          nombre.charAt(0).toUpperCase() +
            nombre.slice(1) +
            ", se ha registrado correctamente",
          ""
        );

        setTimeout(() => {
          navigate("/portal/personas/");
        }, 1500); // Espera 2 segundos antes de recargar la página
      });
    } catch (error) {
      alerta(
        "error",
        "Error al registrar la persona",
        error.response.data.error
      );
    }
  };

  const obtenerPersona = async (id) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(`/personas/${id}`, config);
      setPersona(data);
    } catch (error) {
      navigate("/portal/personas/");
    } finally {
      setCargando(false);
    }
  };

  const eliminarPersona = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.delete(`/personas/${id}`, config);

      const personasActualizadas = personas.filter(
        (personaState) => personaState._id !== id
      );
      setPersonas(personasActualizadas);

      const nombre = persona.nombre;

      setTimeout(() => {
        alerta(
          "success",
          nombre.charAt(0).toUpperCase() +
            nombre.slice(1) +
            ", se ha eliminado correctamente",
          ""
        );
        navigate("/portal/personas/");
      });
    } catch (error) {
      alerta(
        "error",
        "Error al registrar la persona",
        error.response.data.error
      );
    }
  };

  const handleModalNecesidad = () => {
    setModalFormNecesidad(!modalFormNecesidad);
    setNecesidad({});
  };

  const submitNecesidad = async (necesidad) => {
    if (necesidad?.id) {
      await editarNecesidad(necesidad);
    } else {
      await crearNecesidad(necesidad);
    }
  };

  const crearNecesidad = async (necesidad) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        "/necesidades",
        necesidad,
        config
      );
      setModalFormNecesidad(false);

      socket.emit("nueva necesidad", data);
    } catch (error) {
      console.log(error);
    }
  };

  const editarNecesidad = async (necesidad) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put(
        `/necesidades/${necesidad.id}`,
        necesidad,
        config
      );

      // Socket
      socket.emit("actualizar necesidad", data);

      setModalFormNecesidad(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalEditarNecesidad = (necesidad) => {
    setNecesidad(necesidad);
    setModalFormNecesidad(true);
  };

  const handleModalEliminarNecesidad = (necesidad) => {
    setNecesidad(necesidad);
    setModalEliminarNecesidad(!modalEliminarNecesidad);
  };

  const eliminarNecesidad = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.delete(
        `/necesidades/${necesidad._id}`,
        config
      );
      alerta("success", data.msg, "");

      setModalEliminarNecesidad(false);
      setNecesidad({});

      // Socket
      socket.emit("eliminar necesidad", necesidad);
    } catch (error) {}
  };

  const submitAsignacion = async (nombre) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        "/personas/asistentes",
        { nombre },
        config
      );

      setAsistente(data);
    } catch (error) {
      alerta("error", error.response.data.msg, "Intentelo nuevamente");
    } finally {
      setCargando(false);
    }
  };

  const agregarAsignacion = async (email) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/personas/asistentes/${persona._id}`,
        email,
        config
      );

      alerta("success", data.msg, "");
      navigate(`/portal/personas/${persona._id}`);
      setAsistente({});
    } catch (error) {
      alerta("error", error.response.data.msg, "");
    }
  };

  const handleModalEliminarAsignacion = (asignacion) => {
    setModalEliminarAsignacion(!modalEliminarAsignacion);
    setAsignacion(asignacion);
  };

  const eliminarAsignacion = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/personas/eliminar-asistente/${persona._id}`,
        { id: asignacion._id },
        config
      );

      const personaActualizada = { ...persona };
      personaActualizada.asignacion = personaActualizada.asignacion.filter(
        (asignacionState) => asignacionState._id !== asignacion._id
      );
      setPersona(personaActualizada);

      alerta("success", data.msg, "");
      setAsignacion({});
      setModalEliminarAsignacion(false);
    } catch (error) {
      alerta("", error.response.data.msg, "");
    }
  };

  const completarNecesidad = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/necesidades/estado/${id}`,
        {},
        config
      );

      // Socket
      socket.emit("cambiar estado", data);

      setNecesidad({});
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuscador = () => {
    setBuscador(!buscador);
  };

  // Socket io
  const submitNecesidadesPersona = (necesidad) => {
    const personaActualizada = { ...persona };
    personaActualizada.necesidades = [
      ...personaActualizada.necesidades,
      necesidad,
    ];
    setPersona(personaActualizada);
  };

  const eliminarNecesidadPersona = (necesidad) => {
    const personaActualizada = { ...persona };
    personaActualizada.necesidades = personaActualizada.necesidades.filter(
      (necesidadState) => necesidadState._id !== necesidad._id
    );
    setPersona(personaActualizada);
  };

  const actualizarNecesidadPersona = (necesidad) => {
    const personaActualizada = { ...persona };
    personaActualizada.necesidades = personaActualizada.necesidades.map(
      (necesidadState) =>
        necesidadState._id === necesidad._id ? necesidad : necesidadState
    );
    setPersona(personaActualizada);
  };

  const completarNecesidadPersona = (necesidad) => {
    const personaActualizada = { ...persona };
    personaActualizada.necesidades = personaActualizada.necesidades.map(
      (necesidadState) =>
        necesidadState._id === necesidad._id ? necesidad : necesidadState
    );
    setPersona(personaActualizada);
  };

  return (
    <PersonasContext.Provider
      value={{
        personas,
        submitPersona,
        obtenerPersona,
        persona,
        cargando,
        eliminarPersona,
        modalFormNecesidad,
        handleModalNecesidad,
        submitNecesidad,
        handleModalEditarNecesidad,
        necesidad,
        modalEliminarNecesidad,
        handleModalEliminarNecesidad,
        eliminarNecesidad,
        asistente,
        submitAsignacion,
        agregarAsignacion,
        modalEliminarAsignacion,
        handleModalEliminarAsignacion,
        eliminarAsignacion,
        completarNecesidad,
        buscador,
        handleBuscador,
        submitNecesidadesPersona,
        eliminarNecesidadPersona,
        actualizarNecesidadPersona,
        completarNecesidadPersona,
      }}
    >
      {children}
    </PersonasContext.Provider>
  );
};

export { PersonasProvider };

export default PersonasContext;
