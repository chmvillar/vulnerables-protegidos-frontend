import { Link } from "react-router-dom";
import { LuUser2, LuArrowRight } from "react-icons/lu";

const PreviewPersona = ({ persona }) => {
  const { nombre, rut, _id } = persona;

  return (
    <div className="flex">
      <div className="flex items-center justify-center mr-2 text-2xl text-blue-500 hover:text-green-500 transition-colors">
        <LuUser2 />
      </div>
      <p className="capitalize flex-1 text-xl">
        {nombre} <span className="text-xs text-gray-500">{rut}</span>
      </p>
      <div className="flex items-center space-x-4">
        <Link
          to={`${_id}`}
          className="text-blue-500 hover:text-green-500 text-2xl uppercase font-bold transition-colors"
        >
          <LuArrowRight/>
        </Link>
      </div>
    </div>
  );
};

export default PreviewPersona;
