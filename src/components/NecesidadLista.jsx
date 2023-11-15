import { compareAsc } from 'date-fns';
import Necesidad from './Necesidad';

const NecesidadesLista = ({ necesidades }) => {
  // Ordena las necesidades por estado (completadas al final) y fecha
  const necesidadesOrdenadas = necesidades.sort((a, b) => {
    // Compara por estado
    if (a.estado !== b.estado) {
      return a.estado ? 1 : -1; // Completadas al final
    }

    // Compara por fecha
    return compareAsc(new Date(a.fechaMaxima), new Date(b.fechaMaxima));
  });

  return (
    <div>
      {necesidadesOrdenadas.map((necesidad) => (
        <Necesidad key={necesidad._id} necesidad={necesidad} />
      ))}
    </div>
  );
};

export default NecesidadesLista;
