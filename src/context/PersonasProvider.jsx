import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";

const PersonasContext = createContext();

const PersonasProvider = ({ children }) => {
  const [personas, setPersonas] = useState([]);

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
    } catch (error) {
      console.log(error);
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
