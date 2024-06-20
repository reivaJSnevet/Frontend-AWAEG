
const About = () => {
  return (
    <div name="sobre" className="w-full my-32 ">
      <div className="max-w-[1240px] mx-auto">
        <div className="text-center">
          <h2 className="text-5xl font-bold">¿Quiénes Somos?</h2>
          <p className="py-6 text-3xl text-gray-500">
            {" "}
            En AWAEG, estamos comprometidos con la mejora de la educación en la
            Escuela de Guayabal, en el cantón de Santa Cruz, Guanacaste. Nuestra
            misión es abordar un problema crítico que enfrenta esta querida
            institución: la necesidad de un sistema administrativo eficiente que
            simplifique las tareas administrativas y mejore la comunicación
            entre los docentes y los padres de familia.
          </p>
        </div>

        <div className="grid gap-1 px-2 text-center md:grid-cols-3">
          <div className="py-8 border shadow-xl rounded-xl">
            <p className="text-6xl font-bold text-indigo-600 ">100%</p>
            <p className="mt-2 text-gray-400">Remoto</p>
          </div>
          <div className="py-8 border shadow-xl rounded-xl">
            <p className="text-6xl font-bold text-indigo-600 ">100%</p>
            <p className="mt-2 text-gray-400">Confiable</p>
          </div>
          <div className="py-8 border shadow-xl rounded-xl">
            <p className="text-6xl font-bold text-indigo-600 ">100%</p>
            <p className="mt-2 text-gray-400">Seguro</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
