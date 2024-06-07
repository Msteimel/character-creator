import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { fetchData } from "@/utils/fetchData";

export interface CharacterSkillProps {
  index: string;
  name: string;
  url: string;
}

export interface SkillsContextProps {
  skills: CharacterSkillProps[];
}

export interface SkillsProviderProps {
  children: ReactNode;
}

const SkillsContext = createContext<SkillsContextProps | null>(null);

export const useSkills = (): SkillsContextProps => {
  const context = useContext(SkillsContext);

  if (!context) {
    throw new Error("useSkills must be used within a SkillsProvider");
  }

  return context;
};

export const SkillsProvider = ({ children }: SkillsProviderProps) => {
  const [skills, setSkills] = useState<CharacterSkillProps[]>([]);

  const fetchSkills = async () => {
    try {
      const data = await fetchData("/api/skills");
      const mappedData = data.map((skill: any) => ({
        id: skill.index,
        label: skill.name,
        value: skill.index,
        url: skill.url,
      }));

      console.log("mappedData", mappedData);

      setSkills(mappedData);
    } catch (error) {
      console.error("Failed to fetch skills:", error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // useEffect(() => {
  //   const fetchDataFromApi = async () => {
  //     skills.map(async (skill) => {
  //       try {
  //         // const data = await fetchData(skill.url);
  //         console.log("skill", `https://www.dnd5eapi.co${skill.url}`);

  //         // console.log(data);
  //       } catch (error) {
  //         console.error("Failed to fetch skill:", error);
  //       }
  //     });
  //   };

  //   fetchDataFromApi();
  // }, [skills]);

  return (
    <SkillsContext.Provider value={{ skills }}>
      {children}
    </SkillsContext.Provider>
  );
};
