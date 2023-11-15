import { Link } from "react-router-dom";

const Inicio = () => {

  return (
    <div className="btn-registrar flex flex-col justify-center items-center rounded-lg px-7 py-1 text-white font-bold">
      <Link to="/portal/">Login</Link>
    </div>
  );
};

export default Inicio;
