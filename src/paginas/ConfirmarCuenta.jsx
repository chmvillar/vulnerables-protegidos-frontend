import { useEffect } from "react";
import { useParams } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import Swal from "sweetalert2";

const ConfirmarCuenta = () => {

const params = useParams();
const { id } = params;

useEffect( () => {
  const confirmarCuenta = async () => {
    try {
      const url = `/usuarios/confirmar/${id}`;
      const { data } = await clienteAxios(url);
      Swal.fire({
        icon: "success",
        title: "Correo confirmado exitosamente",
        text: data.msg,
        confirmButtonColor: "#3085d6",
        allowOutsideClick: false,
        confirmButtonText: "Continuar",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/portal/';
        }
      });
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: "error",
        title: "Enlace expirado",
        text: "Comunicate con el administrador",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Volver",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/portal/';
        }
      });
    }
  }
  confirmarCuenta();
}, [id]);

  return (
    <>
      <h1 className="ini-sesion font-black text-6xl text-center mx-auto pb-10 2xl:w-4/5">
        Vulnerables Protegidos
      </h1>
    </>
  );
};

export default ConfirmarCuenta;
