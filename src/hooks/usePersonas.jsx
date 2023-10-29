import { useContext } from "react";
import PersonasContext from "../context/PersonasProvider";

const usePersonas = () => {
    return useContext(PersonasContext);
}

export default usePersonas;