import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { fetchData } from "@utils/fetchData"; // Import the fetchData function

interface CharacterClass {
  index: string;
  name: string;
  url: string;
}

interface ClassesContextProps {
  classes: CharacterClass[];
}

const ClassesContext = createContext<ClassesContextProps | null>(null);

export const useClasses = (): ClassesContextProps => {
  const context = useContext(ClassesContext);

  if (!context) {
    throw new Error("useClasses must be used within a ClassesProvider");
  }
  return context;
};

interface ClassesProviderProps {
  children: ReactNode;
}

export const ClassesProvider = ({ children }: ClassesProviderProps) => {
  const [classes, setClasses] = useState<CharacterClass[]>([]);

  const fetchDataFromApi = async () => {
    try {
      const data = await fetchData("/api/classes");

      setClasses(data);
    } catch (error) {
      console.error("Failed to fetch classes:", error);
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  return (
    <ClassesContext.Provider value={{ classes }}>
      {children}
    </ClassesContext.Provider>
  );
};
