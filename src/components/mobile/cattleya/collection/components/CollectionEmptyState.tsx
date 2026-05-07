export default function CollectionEmptyState() {
  return (
    <div className="px-5 py-24">
      <div className="rounded-[32px] bg-[#f4f1eb] p-7">
        <p className="text-[24px] font-semibold tracking-[-0.06em] text-black">
          Aucun produit.
        </p>

        <p className="mt-3 text-[14px] leading-6 text-black/55">
          Cette collection ne contient aucun produit pour le moment.
        </p>
      </div>
    </div>
  );
}