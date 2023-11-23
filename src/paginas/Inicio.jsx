import { Link } from "react-router-dom";

const Inicio = () => {
  return (
    <Link to="/portal/">
      <div className="btn-gradient flex flex-col justify-center items-center rounded-lg px-7 text-white font-bold py-1">
        Login
      </div>
    </Link>
  );
};

export default Inicio;
