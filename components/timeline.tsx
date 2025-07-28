export default function Timeline() {
  const timeline = [
    {
      year: "1960",
      title: "Naissance",
      description:
        "Création de la sophrologie par Alfonso Caycedo, neuropsychiatre colombien.",
    },
    {
      year: "1970",
      title: "Influences",
      description:
        "Influencé par le yoga, le zen et l’hypnose, Caycedo structure la méthode.",
    },
    {
      year: "1980",
      title: "France",
      description:
        "Développement en France et intégration dans le domaine médical.",
    },
    {
      year: "1990",
      title: "Branches",
      description:
        "Naissance des branches caycédienne et non caycédienne. Diversification.",
    },
    {
      year: "2000",
      title: "Diversification",
      description: "Dans éducation, santé.",
    },
    {
      year: "2025",
      title: "Aujourd’hui",
      description:
        "Méthode reconnue et utilisée dans de nombreux domaines : éducation, santé, entreprise.",
    },
  ];

  return (
    <div className="py-8 px-10">
      <h2 className="text-2xl md:text-5xl font-semibold text-center mb-20 px-4 py-2 text-white">
        L’histoire de la sophrologie
      </h2>

      <div className="flex flex-col md:flex-row md:justify-between items-center gap-12 relative">
        {/* Ligne verte horizontale centrée verticalement */}
        <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-green-500 z-0" />
        {/* Ligne verte verticale centrée (mobile) */}
        <div className="md:hidden absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-green-500 z-0" />

        {timeline.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center md:text-left relative z-10 md:w-1/6"
            style={{ minHeight: "180px" }}
          >
            {/* Desktop alternance */}
            <div className="hidden md:block">
              {/* Point vert centré sur la ligne */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full z-10" />
              {/* Bloc au-dessus (aligné par le bas) */}
              {index % 2 === 0 && (
                <div className="absolute left-1/2 bottom-1/2 -translate-x-1/2 translate-y-0 mb-4 w-full md:w-72">
                  <div className="bg-white/70 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg w-full">
                    <h3 className="font-bold">
                      {item.year} — {item.title}
                    </h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              )}
              {/* Bloc en-dessous (aligné par le haut) */}
              {index % 2 === 1 && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 mt-4 w-full md:w-72">
                  <div className="bg-white/70 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg w-full">
                    <h3 className="font-bold">
                      {item.year} — {item.title}
                    </h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              )}
            </div>
            {/* Mobile version : point au-dessus et bloc en dessous */}
            <div className="md:hidden w-4 h-4 bg-green-500 rounded-full mb-2" />
            <div className="md:hidden bg-white/70 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg w-full mt-4">
              <h3 className="font-bold">
                {item.year} — {item.title}
              </h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
