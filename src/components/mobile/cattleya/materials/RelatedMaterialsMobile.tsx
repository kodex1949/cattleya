import Link from "next/link";

type Props = {
  currentHandle: string;
};

const materials = [
  "rose",
  "oud",
  "ambre",
  "jasmin",
  "musc",
  "vanille",
];

export default function RelatedMaterialsMobile({
  currentHandle,
}: Props) {
  return (
    <section className="px-5 py-20">
      <p className="text-[9px] uppercase tracking-[0.4em] text-white/35">
        Explorer
      </p>

      <h2 className="mt-4 font-serif text-[42px] font-light leading-[0.9] tracking-[-0.06em]">
        Autres matières
      </h2>

      <div className="mt-10 flex flex-wrap gap-3">
        {materials
          .filter((item) => item !== currentHandle)
          .map((item) => (
            <Link
              key={item}
              href={`/mobile/matieres/${item}`}
              className="border border-white/10 px-5 py-3 text-[10px] uppercase tracking-[0.3em] text-white/60"
            >
              {item}
            </Link>
          ))}
      </div>
    </section>
  );
}