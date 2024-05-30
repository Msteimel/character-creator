import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface CharacterClass {
  index: string;
  name: string;
  url: string;
}

interface ClassesContextProps {
  classes: CharacterClass[];
}

const ClassesContext = createContext<ClassesContextProps | undefined>(
  undefined,
);

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

  useEffect(() => {
    const fetchClasses = async () => {
      const res = await fetch("https://www.dnd5eapi.co/api/classes");
      const data = await res.json();
      setClasses(data.results);
    };
    fetchClasses();
  }, []);

  return (
    <ClassesContext.Provider value={{ classes }}>
      {children}
    </ClassesContext.Provider>
  );
};
