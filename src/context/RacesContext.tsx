import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { fetchData } from "@utils/fetchData"; // Import the fetchData function

export interface CharacterRaces {
  index: string;
  name: string;
  url: string;
}

export interface RacesContextProps {
  races: CharacterRaces[];
}

const RacesContext = createContext<RacesContextProps | null>(null);

export const useRaces = (): RacesContextProps => {
  const context = useContext(RacesContext);

  if (!context) {
    throw new Error("useRaces must be used within a RacesProvider");
  }

  return context;
};

export interface RacesProviderProps {
  children: ReactNode;
}

export const RacesProvider = ({ children }: RacesProviderProps) => {
  const [races, setRaces] = useState<CharacterRaces[]>([]);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const data = await fetchData("/api/races");

        setRaces(data);
      } catch (error) {
        console.error("Failed to fetch races:", error);
      }
    };

    fetchDataFromApi();
  }, []); // Remove extra closing parenthesis and empty array

  return (
    <RacesContext.Provider value={{ races }}>{children}</RacesContext.Provider>
  );
};
