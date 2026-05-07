type CollectionHeaderProps = {
  title: string;

  description?: string | null;
};

export default function CollectionHeader({
  title,
  description,
}: CollectionHeaderProps) {
  return (
    <div className="px-5 pt-28">
      <p className="text-[10px] uppercase tracking-[0.28em] text-black/35">
        Cattleya Collection
      </p>

      <h1 className="mt-3 text-[42px] font-semibold tracking-[-0.08em] text-black">
        {title}
      </h1>

      {description ? (
        <p className="mt-4 max-w-[500px] text-[14px] leading-6 text-black/55">
          {description}
        </p>
      ) : null}
    </div>
  );
}