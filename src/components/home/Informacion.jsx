import React from "react";
import { GrCertificate, GrCompliance, GrWorkshop } from "react-icons/gr";

const Informacion = () => {
  return (
    <div name="informacion" className="w-full mt-24 ">
      <div className="w-full h-[700px] bg-gray-900/90 absolute">
        <img
          className="w-full h-full object-cover mix-blend-overlay"
          src="/a.jpg"
          alt="img"
        />
      </div>

      <div className="max0w0-[1240px] mx-auto text-white relative">
        <div className="px-4 py-12">
          <h2 className="text-3xl pt-8 text-slate-300 uppercase text-center">
            Información
          </h2>
          <h3 className="text-5xl font-bold py-6 text-center">
            Escuela Guyabal
          </h3>
          <p className="py-4 text-2xl text-slate-300">
            Nuestras instalaciones, ubicada en el cantón de Santa Cruz,
            Guanacaste, han sido diseñadas con la sonrisa de nuestros
            estudiantes como inspiración principal. Hemos creado un espacio que
            los conecta con su entorno de una manera única, fomentando la
            integración del juego y el aprendizaje mutuamente beneficioso.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 relative gap-x-8 gap-y-16 px-4 pt-12 sm:pt-20 text-black">
          <div className="bg-white rounded-xl shadow-2xl">
            <div className="p-8">
              <GrCertificate className="w-16 p-4 bg-indigo-600 text-white text-6xl rounded-lg mt-[-4rem]" />
              <h3 className="font-bold text-2xl my-6">Misión</h3>
              <p className="text-gray-600 text-xl">
                is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-2xl">
            <div className="p-8">
              <GrCompliance className="w-16 p-4 bg-indigo-600 text-white text-6xl rounded-lg mt-[-4rem]" />
              <h3 className="font-bold text-2xl my-6">Visión</h3>
              <p className="text-gray-600 text-xl">
                is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-2xl">
            <div className="p-8">
              <GrWorkshop className="w-16 p-4 bg-indigo-600 text-white text-6xl rounded-lg mt-[-4rem]" />
              <h3 className="font-bold text-2xl my-6">Enfoque Educativo</h3>
              <p className="text-gray-600 text-xl">
                is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Informacion;
