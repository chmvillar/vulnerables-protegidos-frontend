import { Link } from "react-router-dom";

const Inicio = () => {
  return (
    <div>
      <p> Inicio</p>
      <Link to="/portal/">Login</Link>
    </div>
  );
};

export default Inicio;
