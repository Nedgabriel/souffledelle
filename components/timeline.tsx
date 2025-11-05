"use client";

export default function Timeline() {
  const timeline = [
    { year: "1960", title: "Naissance", description: "Création de la sophrologie par Alfonso Caycedo, neuropsychiatre colombien." },
    { year: "1970", title: "Influences", description: "Influencé par le yoga, le zen et l’hypnose, Caycedo structure la méthode." },
    { year: "1980", title: "France", description: "Développement en France et intégration dans le domaine médical." },
    { year: "1990", title: "Branches", description: "Naissance des branches caycédienne et non caycédienne. Diversification." },
    { year: "2000", title: "Diversification", description: "Dans éducation, santé." },
    { year: "2025", title: "Aujourd’hui", description: "Méthode reconnue et utilisée dans de nombreux domaines : éducation, santé, entreprise." },
  ];

  // Séparer blocs gauche/droite pour desktop
  const leftBlocks = timeline.filter((_, index) => index % 2 === 0);
  const rightBlocks = timeline.filter((_, index) => index % 2 === 1);

  return (
    <div className="w-full px-3 py-3 relative mb-30">
      <h2 className="text-3xl md:text-4xl !text-white">
        L’histoire de la sophrologie
      </h2>

      {/* Desktop layout */}
      <div className="hidden md:flex w-full relative justify-center ">
        {/* Colonne gauche */}
        <div className="flex flex-col items-end w-1/2 pr-8 space-y-12 ">
          {leftBlocks.map((item, idx) => (
            <div key={idx} className="relative w-80">
              {/* Point vert */}
              <div className="absolute right-[-42px] top-1/2 -translate-y-1/2 w-5 h-5 bg-green-500 rounded-full shadow-md"></div>
              <div className="bg-green-800/40 backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-lg">
                <h3 className="font-bold text-lg mb-1 !text-white">{item.year} — {item.title}</h3>
                <p className="text-sm opacity-90 !text-gray-300">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Ligne verte verticale */}
        <div className="absolute top-0 bottom-[-80px] left-1/2 -translate-x-1/2 w-1 bg-green-500 z-0"></div>

        {/* Colonne droite */}
        <div className="flex flex-col items-start w-1/2 pl-8 space-y-12">
          {rightBlocks.map((item, idx) => (
            <div key={idx} className="relative w-80 top-[80px]">
              {/* Point vert */}
              <div className="absolute left-[-42px] top-[40px] w-5 h-5 bg-green-500 rounded-full shadow-md"></div>
              <div className="bg-green-800/40 backdrop-blur-md px-6 py-4 rounded-2xl shadow-lg">
                <h3 className="text-lg mb-1 !text-white">{item.year} — {item.title}</h3>
                <p className="text-sm opacity-90 !text-gray-300">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden flex flex-col items-center relative">
        {/* Ligne verte verticale */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-green-500 z-0"></div>

        {timeline.map((item, idx) => (
          <div key={idx} className="relative mb-12 flex flex-col items-center w-full px-4">
            <div className="w-5 h-5 bg-green-500 rounded-full shadow-md mb-4"></div>
            <div className="bg-green-800/40 backdrop-blur-md !text-white px-6 py-4 rounded-2xl shadow-lg w-full">
              <h3 className="text-lg mb-1 !text-white">{item.year} — {item.title}</h3>
              <p className="text-sm opacity-90">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
