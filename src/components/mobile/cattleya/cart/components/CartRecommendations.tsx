"use client";

const recommendations = [
  {
    title: "Huile parfumée",
    subtitle: "Ambre · Vanille",
  },
  {
    title: "Format voyage",
    subtitle: "10ml signature",
  },
  {
    title: "Brume textile",
    subtitle: "Musc blanc",
  },
];

export default function CartRecommendations() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[13px] font-semibold text-white">
          Complétez votre rituel
        </p>

        <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
          Sélection
        </p>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {recommendations.map((item) => (
          <button
            key={item.title}
            className="min-w-[170px] rounded-[24px] bg-white/[0.07] p-4 text-left"
          >
            <div className="mb-5 h-[90px] rounded-[18px] bg-gradient-to-br from-[#d6bc91]/25 via-white/10 to-transparent" />

            <p className="text-[15px] font-semibold tracking-[-0.04em] text-white">
              {item.title}
            </p>

            <p className="mt-1 text-[12px] text-white/45">
              {item.subtitle}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}