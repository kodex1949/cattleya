"use client";

type ProductEditorialDetailsMobileProps = {
  description?: string | null;
};

const items = [
  {
    title: "Ingrédients",
    text: "Une composition raffinée pensée autour d’une signature florale, douce et enveloppante.",
  },
  {
    title: "Tri & environnement",
    text: "Pensez à trier vos emballages selon les consignes locales afin de prolonger le geste responsable.",
  },
  {
    title: "Art d’offrir",
    text: "Chaque commande peut devenir un présent : coffret, message et préparation soignée.",
  },
  {
    title: "Livraison",
    text: "Livraison rapide et retours possibles selon les conditions de la boutique.",
  },
];

export default function ProductEditorialDetailsMobile({
  description,
}: ProductEditorialDetailsMobileProps) {
  return (
    <section className="space-y-12">
      <div className="border-t border-black/10 pt-10">
        <p className="text-[11px] font-medium text-neutral-500">
          Description
        </p>

        <h2 className="mt-4 text-[30px] font-light leading-[1] tracking-[-0.055em]">
          Une fragrance pensée comme une présence.
        </h2>

        <p className="mt-6 text-[15px] leading-8 text-neutral-600">
          {description ||
            "Une fragrance élégante, enveloppante et mémorable, pensée pour accompagner la peau avec douceur et caractère."}
        </p>
      </div>

      <div className="border-y border-black/10">
        {items.map((item) => (
          <details
            key={item.title}
            className="group border-b border-black/10 last:border-b-0"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between py-6">
              <span className="text-[16px] font-light tracking-[-0.03em]">
                {item.title}
              </span>

              <span className="text-2xl font-light transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>

            <p className="pb-6 text-sm leading-7 text-neutral-500">
              {item.text}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}