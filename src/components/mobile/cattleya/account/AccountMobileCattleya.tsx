type AccountMobileCattleyaProps = {
  email: string;
};

export default function AccountMobileCattleya({
  email,
}: AccountMobileCattleyaProps) {
  return (
    <div className="px-5 pb-24 pt-28 text-white">
      <div className="mx-auto max-w-[420px]">
        <p className="text-[10px] uppercase tracking-[0.48em] text-white/34">
          Mon compte
        </p>

        <h1 className="mt-5 text-[54px] font-light leading-[0.82] tracking-[-0.1em]">
          Bonjour.
        </h1>

        <p className="mt-5 text-[14px] leading-7 text-white/54">
          {email}
        </p>

        <div className="mt-14 border-t border-white/10 pt-8">
          <div className="flex items-center justify-between border-b border-white/10 py-5">
            <span className="text-[14px] text-white/72">
              Commandes
            </span>

            <span className="text-[10px] uppercase tracking-[0.22em] text-white/32">
              00
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-white/10 py-5">
            <span className="text-[14px] text-white/72">
              Adresses
            </span>

            <span className="text-[10px] uppercase tracking-[0.22em] text-white/32">
              00
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-white/10 py-5">
            <span className="text-[14px] text-white/72">
              Favoris
            </span>

            <span className="text-[10px] uppercase tracking-[0.22em] text-white/32">
              00
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}