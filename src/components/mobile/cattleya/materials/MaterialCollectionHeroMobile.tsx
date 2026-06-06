type Props = {
  handle: string;
};

export default function MaterialCollectionHeroMobile({
  handle,
}: Props) {
  return (
    <section className="relative h-[80svh] overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[url('/images/material-placeholder.jpg')] bg-cover bg-center" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-[#080604]" />

      <div className="absolute bottom-12 left-5 right-5">
        <p className="text-[10px] uppercase tracking-[0.38em] text-white/45">
          Matière
        </p>

        <h1 className="mt-5 font-serif text-[72px] font-light leading-[0.82] tracking-[-0.08em]">
          {handle}
        </h1>

        <p className="mt-6 max-w-[290px] text-[14px] font-light leading-7 text-white/60">
          Une interprétation olfactive pensée autour de cette matière.
        </p>
      </div>
    </section>
  );
}