// context/SpellsContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

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
    const fetchSpells = async () => {
      const res = await fetch("https://www.dnd5eapi.co/api/spells");
      const data = await res.json();
      setSpells(data.results);
    };
    fetchSpells();
  }, []);

  return (
    <SpellsContext.Provider value={{ spells }}>
      {children}
    </SpellsContext.Provider>
  );
};
