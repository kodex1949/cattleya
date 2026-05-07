import type { SearchNote } from "../search-panel.types";

type SearchNoteCardProps = {
  item: SearchNote;
  index: number;
  onClick: () => void;
};

export default function SearchNoteCard({
  item,
  index,
  onClick,
}: SearchNoteCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative h-[128px] overflow-hidden rounded-[24px] bg-white/[0.08] text-left transition active:scale-[0.98]"
    >
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-active:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/80" />

      <div className="absolute inset-0 bg-black/20" />

      <div className="relative flex h-full flex-col justify-between p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
          {String(index + 1).padStart(2, "0")}
        </p>

        <div>
          <p className="text-[22px] font-semibold tracking-[-0.05em] text-white">
            {item.title}
          </p>

          <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-white/55">
            {item.subtitle}
          </p>
        </div>
      </div>
    </button>
  );
}