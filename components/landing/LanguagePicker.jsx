"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import { DEFAULT_LANGUAGE, LANGUAGES } from "@/data/languages";

export function LanguagePicker({ value = DEFAULT_LANGUAGE, onChange }) {
  const [language, setLanguage] = useState(value);

  function handleChange(event) {
    const next = event.target.value;
    setLanguage(next);
    onChange?.(next);
  }

  return (
    <div className="mt-6">
      <label
        htmlFor="language-picker"
        className="flex items-center gap-3 rounded-[0.85rem] border-2 border-[var(--ink)] bg-[#f3f3f3] px-3.5 py-2.5 sm:px-4 sm:py-3"
      >
        <Globe
          className="h-5 w-5 flex-none text-[var(--muted)]"
          strokeWidth={2}
          aria-hidden
        />

        <span className="caption flex-1 text-sm sm:text-[0.95rem]">
          Choose your language
        </span>

        <select
          id="language-picker"
          name="language"
          value={language}
          onChange={handleChange}
          className="appearance-none cursor-pointer bg-transparent pr-6 text-sm font-bold text-[var(--ink)] outline-none sm:text-[0.95rem]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8' fill='none' stroke='%2314120e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M1 1.5 6 6.5 11 1.5'/%3E%3C/svg%3E\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right center",
            backgroundSize: "0.75rem",
          }}
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
