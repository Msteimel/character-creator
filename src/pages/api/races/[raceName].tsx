import type { NextApiRequest, NextApiResponse } from "next";

export interface RaceDataProps {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { className } = req.query;

  if (typeof className !== "string") {
    res.status(400).json({ error: "Invalid class name" });
    return;
  }

  try {
    const response = await fetch(
      `https://www.dnd5eapi.co/api/races/${className}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch class data");
    }

    const data: RaceDataProps = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
