// context/SpellsContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { fetchData } from "@utils/fetchData"; // Import the fetchData function

interface Spell {
  index: string;
  name: string;
  desc: string;
  [key: string]: any;
}

interface SpellsContextProps {
  spells: Spell[];
}

const SpellsContext = createContext<SpellsContextProps | undefined>(undefined);

export const useSpells = (): SpellsContextProps => {
  const context = useContext(SpellsContext);
  if (!context) {
    throw new Error("useSpells must be used within a SpellsProvider");
  }
  return context;
};

interface SpellsProviderProps {
  children: ReactNode;
}

export const SpellsProvider = ({ children }: SpellsProviderProps) => {
  const [spells, setSpells] = useState<Spell[]>([]);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const data = await fetchData("/api/spells");
        setSpells(data);
      } catch (error) {
        console.error("Failed to fetch spells:", error);
      }
    };
    fetchDataFromApi();
  }, []);

  return (
    <SpellsContext.Provider value={{ spells }}>
      {children}
    </SpellsContext.Provider>
  );
};
