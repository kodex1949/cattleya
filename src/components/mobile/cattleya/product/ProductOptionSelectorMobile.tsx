"use client";

type ProductOptionGroup = {
  name: string;
  values: string[];
};

type ProductOptionSelectorMobileProps = {
  optionGroups: ProductOptionGroup[];
  selections: Record<string, string>;
  onSelect: (name: string, value: string) => void;
};

function getDisplayName(name: string) {
  const normalized = name.trim().toLowerCase();

  if (["size", "sizes", "taille", "tailles"].includes(normalized)) {
    return "Format";
  }

  if (["color", "colors", "colour", "couleur", "coloris"].includes(normalized)) {
    return "Couleur";
  }

  return name;
}

export default function ProductOptionSelectorMobile({
  optionGroups,
  selections,
  onSelect,
}: ProductOptionSelectorMobileProps) {
  return (
    <div className="space-y-8">
      {optionGroups.map((group) => (
        <div key={group.name} className="text-center">
          <p className="mb-4 text-[10px] uppercase tracking-[0.42em] text-black/35">
            {getDisplayName(group.name)}
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {group.values.map((value) => {
              const selected = selections[group.name] === value;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => onSelect(group.name, value)}
                  className={`
                    min-w-[88px] border px-5 py-3 text-[12px]
                    uppercase tracking-[0.18em] transition-all duration-300
                    ${
                      selected
                        ? "border-black bg-black text-white"
                        : "border-black/15 bg-transparent text-black/60"
                    }
                  `}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}