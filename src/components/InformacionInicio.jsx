import QAPanel from "./QAPanel";

const InformacionInicio = () => {
  return (
    <div className="flex flex-col">
      <div className="mt-0.5 p-5 h-1/2 bg-white">
        <div className="flex justify-center items-center">
          <a href="tel:1518">
            <img
              src="https://i.ibb.co/f1FWSDq/279946538-365395948963849-5840987823382243196-n.jpg"
              alt="Fono emergencia: 1518"
              className="rounded-lg"
            />
          </a>
        </div>
        <div className="container-inicio flex xl:flex-row gap-5 rounded-lg p-5 mx-auto sm:w-3/4 w-full xl:w-2/4">
          <p className="txt-inicio xl:text-xl lg:text-xl  text-gray-500 p-3 shadow-lg shadow-orange-100 rounded-lg mt-2">
            Esta web está orientada a que puedan informarnos sobre alguna
            persona de su circulo o alguien de la calle, que esté necesitando
            ayuda y podamos realizar una visita a esa persona y/o familia.
          </p>
          <p className="txt-inicio xl:text-xl lg:text-xl text-gray-500 p-3 shadow-lg shadow-orange-100 rounded-lg mt-2">
            Si está interesado en compartir sus conocimientos en algún área, o
            quiere ofrecer su ayuda en algún tema, no dude en enviar su
            información para tenerla en nuestros registros y contactarnos cuando
            se necesite.
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-0.5 p-5 h-1/2 bg-white">
        <blockquote className="text-2xl font-semibold italic text-center text-slate-900 mt-5 mb-10">
          <span className="qa before:block before:absolute before:-inset-2 before:-skew-y-2 relative inline-block">
            <span className="relative text-white text-3xl">
              Preguntas y Respuestas
            </span>
          </span>
        </blockquote>
        <QAPanel
          question="¿Cómo puedo solicitar una visita a una persona?"
          answer='Para solicitar una visita, puede enviar la información que tenga a mano, desde el link "Solicitar Visita" en la parte superior de la web.'
        />
        <QAPanel
          question="¿Cuál es el propósito de enviar un formulario de visita?"
          answer="El propósito es que podamos realizar una visita a la persona o familia en situación de vulnerabilidad y poder entregarle ayuda en lo que esté necesitando."
        />
        <QAPanel
          question="¿Cómo puedo ofrecer mi ayuda para eventos caritativos?"
          answer='Para ofrecer su ayuda, puede enviarnos su información personal, desde el link "Solicitar Visita" en la parte superior de la web.'
        />
        <QAPanel
          question="¿Qué información se recopila a través del formulario de visita?"
          answer="Se almacena el nombre, rut (si es que lo sabe) dirección y el mensaje que usted envía, para nosotros realizar la porterior visita."
        />
        <QAPanel
          question="¿Puedo ofrecer ayuda específica, como donaciones o servicios?"
          answer='Claro que si. Desde el apartado de "Ofrecer ayuda" puede enviar su información y nos pondremos en contacto con usted.'
        />
        <QAPanel
          question="¿Cuáles son los próximos eventos caritativos?"
          answer="Para conocer los próximos eventos, puede visitar la página 'Blog' en la parte superior de la web."
        />
      </div>
      <div className="flex justify-center items-center bg-white mt-0.5 p-5">
        <p>
          Desarrollado por{" "}
          <span className="header-portal">EMC Digital Studio©</span>
        </p>
      </div>
    </div>
  );
};

export default InformacionInicio;
