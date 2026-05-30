"use client";

type SearchPCEmptyProps = {
  onSelect: (value: string) => void;

  eyebrow?: string;
  title?: string;
  description?: string;
  ctaLabel?: string;

  mediaType?: "image" | "video";
  mediaUrl?: string;
};

export default function SearchPCEmpty({
  eyebrow,
  title,
  description,
  ctaLabel,
  mediaType,
  mediaUrl,
}: SearchPCEmptyProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {mediaUrl ? (
        <>
          {mediaType === "video" ? (
            <video
              key={mediaUrl}
              src={mediaUrl}
              muted
              defaultMuted
              autoPlay
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <img
              src={mediaUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}

          <div className="absolute inset-0 bg-black/45" />

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.78))]" />
        </>
      ) : null}

      <div className="relative z-10 flex h-full flex-col justify-end p-14 text-white">
        <p className="text-[10px] uppercase tracking-[0.44em] text-white/40">
          {eyebrow ??
            "Maison Cattleya"}
        </p>

        <h2 className="mt-7 max-w-[320px] font-serif text-[82px] font-light leading-[0.84] tracking-[-0.08em] text-white">
          {title ??
            "Trouver le sillage"}
        </h2>

        <p className="mt-10 max-w-[320px] text-[13px] leading-7 text-white/60">
          {description ??
            "Explorez une émotion, une note ou une signature olfactive."}
        </p>

        {ctaLabel ? (
          <span className="mt-8 inline-flex text-[10px] uppercase tracking-[0.34em] text-white/70">
            {ctaLabel}
          </span>
        ) : null}
      </div>
    </div>
  );
}