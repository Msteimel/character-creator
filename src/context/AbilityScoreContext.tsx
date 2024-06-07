import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { fetchData } from "@utils/fetchData";

export interface CharacterAbilityScore {
  index: string;
  name: string;
  url: string;
}

export interface AbilityScoreContextProps {
  abilityScores: CharacterAbilityScore[];
}

const AbilityScoreContext = createContext<AbilityScoreContextProps | null>(
  null,
);

export const useAbilityScores = (): AbilityScoreContextProps => {
  const context = useContext(AbilityScoreContext);

  if (!context) {
    throw new Error(
      "useAbilityScores must be used within an AbilityScoreProvider",
    );
  }

  return context;
};

export interface AbilityScoreProviderProps {
  children: ReactNode;
}

export const AbilityScoreProvider = ({
  children,
}: AbilityScoreProviderProps) => {
  const [abilityScores, setAbilityScores] = useState<CharacterAbilityScore[]>(
    [],
  );

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const data = await fetchData("/api/ability-scores");
        setAbilityScores(data);
      } catch (error) {
        console.error("Failed to fetch ability scores:", error);
      }
    };

    fetchDataFromApi();
  }, []);

  return (
    <AbilityScoreContext.Provider value={{ abilityScores }}>
      {children}
    </AbilityScoreContext.Provider>
  );
};
