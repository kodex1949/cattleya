export default function CartPCEmpty() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-10 text-center">
      <p className="text-[11px] uppercase tracking-[0.35em] text-black/40">
        Cattleya
      </p>

      <h2 className="mt-4 font-serif text-4xl text-black">
        Votre panier est vide
      </h2>

      <p className="mt-4 max-w-sm text-sm leading-relaxed text-black/55">
        Découvrez notre sélection de créations parfumées.
      </p>
    </div>
  );
}