import React, { useState } from "react";

// ¿Cómo puedo solicitar una visita a una persona vulnerable?

// ¿Cuál es el propósito de enviar un formulario de visita?

// ¿Cómo puedo ofrecer mi ayuda para eventos caritativos?

// ¿Qué información se recopila a través del formulario de visita?

// ¿Cuáles son los próximos eventos caritativos?

const QAPanel = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="acordeon-faq border rounded shadow p-4 mb-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleAccordion}
      >
        <h2 className="text-lg font-semibold">{question}</h2>
        <svg
          className={`w-6 h-6 transition-transform transform text-orange-500 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>

      {isOpen && (
        <div className="p-2 flex justify-center items-center">
          <p className="mt-2 text-gray-500">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default QAPanel;
