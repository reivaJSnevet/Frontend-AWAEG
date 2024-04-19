import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

const Information = () => {
  return (
    <div name="informacion" className="w-full mt-24 ">
      <div className="w-full h-[700px] bg-gray-900/90 absolute">
        <img
          className="object-cover w-full h-full mix-blend-overlay"
          src="/a.webp"
          alt="img"
        />
      </div>

      <div className="max0w0-[1240px] mx-auto text-white relative">
        <div className="px-4 py-12">
          <h2 className="pt-8 text-3xl text-center uppercase text-slate-300">
            Información
          </h2>
          <h3 className="py-6 text-5xl font-bold text-center">
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

        <div className="relative grid grid-cols-1 px-4 pt-12 text-black lg:grid-cols-3 gap-x-8 gap-y-16 sm:pt-20">
          <div className="bg-white shadow-2xl rounded-xl">
            <div className="p-8">
              <WorkspacePremiumIcon fontSize='large' />
              <h3 className="my-6 text-2xl font-bold">Misión</h3>
              <p className="text-xl text-gray-600">
              Somos una institución que contribuye a mejorar la calidad de vida de nuestros estudiantes, con los más altos estándares de excelencia.

              </p>
            </div>
          </div>
          <div className="bg-white shadow-2xl rounded-xl">
            <div className="p-8">
              <AssignmentTurnedInIcon fontSize='large' />
              <h3 className="my-6 text-2xl font-bold">Visión</h3>
              <p className="text-xl text-gray-600">
              Ser una Institución reconocida por tener personal altamente calificado y orientado a satisfacer las necesidades de nuestros estudiantes, que brinde apoyo profesional, calidez humana y un destacado liderazgo en educación
              </p>
            </div>
          </div>
          <div className="bg-white shadow-2xl rounded-xl">
            <div className="p-8">
              <TipsAndUpdatesIcon fontSize='large' />
              <h3 className="my-6 text-2xl font-bold">Enfoque Educativo</h3>
              <p className="text-xl text-gray-600">
<p>Descubre lo que te espera al unirte a nosotros:</p>

<ul>
  <li>-Explora tu Potencial</li>
  <li>-Apoyo Inquebrantable</li>
  <li>-Innovación en la Enseñanza</li>
  <li>-Comunidad en Crecimiento</li>
  <li>-Preparación para el Futuro</li>
</ul>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
