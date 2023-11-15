import usePersona from "../hooks/usePersonas"

const Asignacion = ({ asignacion }) => {
    const { handleModalEliminarAsignacion } = usePersona();
    
    const { nombre, email } = asignacion;
  
    return (
    <div className="border-b p-5 flex justify-between">
        <div className="flex flex-col">
            <p className="text-xl">{nombre}</p>
            <p className=" text-slate-400">{email}</p>
        </div>
        <div className="flex justify-center">
            <button 
                type="button"
            className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => handleModalEliminarAsignacion(asignacion)}>
                Eliminar
            </button>
        </div>
    </div>
  )
}

export default Asignacion