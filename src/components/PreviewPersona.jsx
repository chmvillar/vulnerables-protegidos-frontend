import { Link } from "react-router-dom";
import { LuUser2, LuArrowRight } from "react-icons/lu";
import useAuth from "../hooks/useAuth";

const PreviewPersona = ({ persona }) => {
  const { auth } = useAuth();

  const { nombre, rut, _id, creador } = persona;

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center mr-2 text-2xl text-blue-500 hover:text-green-500 transition-colors">
          <LuUser2 />
        </div>
        <p className="capitalize flex-1 text-xl">
          {nombre} <span className="text-xs text-gray-500">{rut}</span>
        </p>

        {auth._id !== creador && 
        <p className="py-0.5 px-2 text-xs rounded-lg text-white bg-green-500 font-bold uppercase">Asignado</p>}
      </div>

      <div className="flex items-center space-x-4">
        <Link
          to={`${_id}`}
          className="text-blue-500 hover:text-green-500 text-2xl uppercase font-bold transition-colors"
        >
          <LuArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default PreviewPersona;
