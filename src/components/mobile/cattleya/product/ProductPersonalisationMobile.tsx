"use client";

export default function ProductPersonalisationMobile() {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between rounded-[4px] border border-black bg-transparent px-4 py-4 text-left"
    >
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold tracking-[-0.02em]">C∴</span>

        <div>
          <p className="text-sm font-semibold">Ajouter une touche personnelle</p>
          <p className="mt-1 text-xs text-neutral-500">
            Coffret cadeau, message personnalisé
          </p>
        </div>
      </div>

      <span className="text-2xl font-light">+</span>
    </button>
  );
}