import { Link } from "react-router-dom";

const Inicio = () => {

  return (
    <div className="btn-gradient flex flex-col justify-center items-center rounded-lg px-7 text-white font-bold py-1">
      <Link to="/portal/">Login</Link>
    </div>
  );
};

export default Inicio;
