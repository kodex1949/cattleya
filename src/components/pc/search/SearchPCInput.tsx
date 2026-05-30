"use client";

import { ChangeEvent, useEffect, useRef } from "react";

type SearchPCInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchPCInput({
  value,
  onChange,
}: SearchPCInputProps) {
  const inputRef =
    useRef<HTMLInputElement | null>(
      null,
    );

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 420);

    return () =>
      window.clearTimeout(timeout);
  }, []);

  function handleChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    onChange(event.target.value);
  }

  return (
    <div className="group relative">
      <div className="relative overflow-hidden border-b border-black/10 pb-5 transition duration-700 group-focus-within:border-black/30">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Rechercher une note"
          autoComplete="off"
          spellCheck={false}
          className="w-full bg-transparent pr-24 font-serif text-[54px] font-light leading-[0.95] tracking-[-0.07em] text-black outline-none placeholder:text-black/13 xl:text-[68px]"
        />

        <div className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-black/40 transition-all duration-700 group-focus-within:w-full" />

        {value.length > 0 ? (
          <button
            type="button"
            onClick={() => onChange("")}
            className="group/button absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/8 bg-white/70 backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:border-black/18 hover:bg-black"
          >
            <span className="relative h-[10px] w-[10px]">
              <span className="absolute left-1/2 top-1/2 h-px w-[10px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-black/45 transition duration-500 group-hover/button:bg-white" />

              <span className="absolute left-1/2 top-1/2 h-px w-[10px] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-black/45 transition duration-500 group-hover/button:bg-white" />
            </span>
          </button>
        ) : null}
      </div>
    </div>
  );
}