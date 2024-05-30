// pages/_app.tsx
import "@styles/global.css";
import { AppProps } from "next/app";
import { SpellsProvider } from "@context/SpellsContext";
import { ClassesProvider } from "@context/ClassesContext";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SpellsProvider>
      <ClassesProvider>
        <Component {...pageProps} />
      </ClassesProvider>
    </SpellsProvider>
  );
};

export default MyApp;
