import { useParams } from "react-router-dom";
import usePersonas from "../hooks/usePersonas";
import { useEffect } from "react";
import FormularioPersona from "../components/FormularioPersona";

const EditarPersona = () => {
  const params = useParams();
  const { obtenerPersona, persona, cargando } = usePersonas();

  useEffect(() => {
    obtenerPersona(params.id);
  }, []);

  const { nombre } = persona;

  return (
    <>
      <h1 className="font-black text-3xl">{nombre}</h1>

      <div className="mt-10 flex justify-center">
        <FormularioPersona />
      </div>
    </>
  );
};

export default EditarPersona;
