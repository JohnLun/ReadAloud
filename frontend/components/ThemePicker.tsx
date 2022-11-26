import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const options = ["default", "contrast"];

export const ThemePicker = () => {
  const [mounted, setMounted] = useState(false);
  const [themeIndex, setThemeIndex] = useState<number>(0);
  const { setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      type="button"
      className="w-full text-white font-bold mt-1 block px-3 py-2 bg-brown-700 rounded-md text-sm shadow-sm focus:bg-brown-900 hover:bg-brown-800"
      onClick={() => {
        const newIndex = (themeIndex + 1) % options.length;
        setThemeIndex(newIndex);
        setTheme(options[newIndex]);
      }}
    >
      Theme:{" "}
      {options[themeIndex].charAt(0).toUpperCase() +
        options[themeIndex].slice(1)}
    </button>
  );
};
