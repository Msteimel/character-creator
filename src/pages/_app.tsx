// pages/_app.tsx
import { ReactNode } from "react";
import "@styles/global.css";
import { AppProps } from "next/app";
import { SpellsProvider } from "@context/SpellsContext";
import { ClassesProvider } from "@context/ClassesContext";
import { RacesProvider } from "@/context/RacesContext";
import { AbilityScoreProvider } from "@/context/AbilityScoreContext";
import { SkillsProvider } from "@/context/SkillsContext";

interface AppProvidersProps {
  children: ReactNode;
}

// Does having this vs just wrapping the Next Component, really make a difference? idk.
const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <AbilityScoreProvider>
      <SkillsProvider>
        <RacesProvider>
          <SpellsProvider>
            <ClassesProvider>{children}</ClassesProvider>
          </SpellsProvider>
        </RacesProvider>
      </SkillsProvider>
    </AbilityScoreProvider>
  );
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AppProviders>
      <Component {...pageProps} />
    </AppProviders>
  );
};
export default MyApp;
