type Props = {
  handle: string;
};

export default function MaterialProductsMobile({
  handle,
}: Props) {
  return (
    <section className="px-5 py-20">
      <div className="mb-8">
        <p className="text-[9px] uppercase tracking-[0.4em] text-white/35">
          Collection
        </p>

        <h2 className="mt-4 font-serif text-[42px] font-light leading-[0.9] tracking-[-0.06em]">
          Parfums associés
        </h2>
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-[120px] bg-white/5"
          />
        ))}
      </div>
    </section>
  );
}