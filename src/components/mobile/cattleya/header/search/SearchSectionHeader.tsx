type SearchSectionHeaderProps = {
  title: string;
  value?: string;
};

export default function SearchSectionHeader({
  title,
  value,
}: SearchSectionHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <p className="text-[13px] font-semibold tracking-[-0.02em] text-white/90">
        {title}
      </p>

      {value ? (
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/32">
          {value}
        </p>
      ) : null}
    </div>
  );
}