import { useEffect } from "react";
import { useParams } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import Swal from "sweetalert2";

const ConfirmarCuenta = () => {
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/usuarios/confirmar/${id}`;
        const { data } = await clienteAxios(url);
        Swal.fire({
          icon: "success",
          title: "Correo confirmado exitosamente",
          text: data.msg,
          showConfirmButton: false,
          allowOutsideClick: false,
        });
        setTimeout(() => {
          window.location.href = "/portal/";
        }, 2100);
      } catch (error) {
        console.log(first);
      }
    };
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
