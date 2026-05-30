export default function FooterNewsletter() {
  return (
    <div>
      <p className="font-serif text-[20px] font-light tracking-[-0.04em]">
        Inscrivez-vous pour bénéficier de toutes les exclusivités
      </p>

      <form className="mt-7 flex max-w-[560px] gap-2">
        <input
          type="email"
          placeholder="Renseignez un e-mail"
          className="h-[52px] flex-1 rounded-[4px] border border-black/80 bg-transparent px-4 text-[13px] outline-none placeholder:text-black/60"
        />

        <button
          type="submit"
          className="h-[52px] rounded-[4px] bg-[#30363a] px-5 text-[13px] font-semibold text-white transition hover:bg-black"
        >
          Confirmer
        </button>
      </form>

      <div className="mt-32 flex items-center gap-4 text-[13px] font-medium">
        <span>Accessibilité : meilleur contraste</span>

        <span className="relative h-6 w-11 rounded-full bg-[#30363a]">
          <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white" />
        </span>
      </div>
    </div>
  );
}