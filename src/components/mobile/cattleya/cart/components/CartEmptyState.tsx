export default function CartEmptyState() {
  return (
    <div className="rounded-[26px] bg-white/[0.07] p-5">
      <p className="text-[18px] font-semibold tracking-[-0.04em] text-white">
        Votre panier est vide.
      </p>

      <p className="mt-2 text-[13px] leading-5 text-white/50">
        Ajoutez une signature
        Cattleya pour commencer
        votre rituel.
      </p>
    </div>
  );
}