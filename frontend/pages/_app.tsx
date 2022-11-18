import "styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { ThemePicker } from "components/ThemePicker";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider themes={["default", "contrast"]}>
      <ThemePicker />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
