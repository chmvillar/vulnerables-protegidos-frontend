const InformacionInicio = () => {
  return (
    <div className="flex flex-col">
      <div className="mt-0.5 p-5 h-1/2 bg-white">
        <div className="flex justify-center p-4 mx-full">
          <p className="text-3xl">
            ¡Bienvenidos al portal Vulnerables Protegidos!
          </p>
        </div>
          <div className="flex flex-col shadow rounded-lg p-5">
            <p className="text-xl">Esta web está orientada a que puedan informanos sobre alguna persona de su circulo o alguien de la calle, que esté necesitando ayuda y podamos realizar una visita a esa persona y/o familia.</p>
            <p className="text-xl mt-2">Si está interesado en compartir sus conocimientos en algún área, o quiere ofrecer su ayuda en algún tema, no dude en enviar su información para tenerla en nuestros registros y contactarnos cuando se necesite.</p>
          </div>
      </div>
      <div className="flex flex-1 justify-center items-center mt-0.5 p-5 h-1/2 bg-white">
        <p>Publicaciones Portal Posts</p>
        
      </div>
    </div>
  );
};

export default InformacionInicio;
