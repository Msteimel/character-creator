// utils/fetchData.ts
import type { NextApiRequest, NextApiResponse } from "next";

export interface CharacterAbilityScoreProps {
  index: string;
  name: string;
  url: string;
}

export default async function handlerSkill(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const response = await fetch(`https://www.dnd5eapi.co/api/ability-scores`);
    if (!response.ok) {
      throw new Error("Failed to fetch spells");
    }

    const data = await response.json();
    console.log("Fetched data in fetchData:", data.results);

    res.status(200).json(data.results as CharacterAbilityScoreProps[]); // Adjust based on the actual API response
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
