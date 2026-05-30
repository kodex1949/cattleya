import { Bag, MagnifyingGlass, User } from "phosphor-react";

type HeaderPCActionsProps = {
  onSearchOpen: () => void;
  onCartOpen: () => void;
  onAccountOpen: () => void;
  forceColor?: "white" | "black";
};

export default function HeaderPCActions({
  onSearchOpen,
  onCartOpen,
  onAccountOpen,
  forceColor = "black",
}: HeaderPCActionsProps) {
  const colorClass = forceColor === "white" ? "text-white" : "text-black";

  return (
    <div className="flex items-center justify-end gap-7">
      <button
        type="button"
        onClick={onSearchOpen}
        className={`group flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] ${colorClass}/70 transition hover:opacity-100`}
      >
        <MagnifyingGlass size={17} weight="light" />
        Recherche
      </button>

      <button
        type="button"
        onClick={onAccountOpen}
        className={`group flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] ${colorClass}/70 transition hover:opacity-100`}
      >
        <User size={17} weight="light" />
        Compte
      </button>

      <button
        type="button"
        onClick={onCartOpen}
        className={`group flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] ${colorClass}/70 transition hover:opacity-100`}
      >
        <Bag size={17} weight="light" />
        Panier
      </button>
    </div>
  );
}