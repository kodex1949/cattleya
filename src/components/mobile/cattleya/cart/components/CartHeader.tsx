import { X } from "phosphor-react";

type CartHeaderProps = {
  onClose: () => void;
};

export default function CartHeader({
  onClose,
}: CartHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-[10px] uppercase tracking-[0.28em] text-white/38">
          Cattleya Cart
        </p>

        <h2 className="mt-2 text-[30px] font-semibold tracking-[-0.05em]">
          Panier
        </h2>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition active:scale-95"
      >
        <X size={16} weight="bold" />
      </button>
    </div>
  );
}