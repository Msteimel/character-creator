import type { NextApiRequest, NextApiResponse } from "next";

export interface ClassDataProps {
  index: string;
  name: string;
  hit_die: number;
  proficiency_choices: {
    description: string;
    choose: number;
    type: string;
    from: {
      options: {
        item: {
          index: string;
          name: string;
          url: string;
        };
      }[];
    };
  }[];
  proficiencies: {
    name: string;
    index: string;
    url: string;
  }[];
  saving_throws: {
    name: string;
    index: string;
    url: string;
  }[];
  // starting_equipment: {
  //   url: string;
  //   class: string;
  // };
  // class_levels: {
  //   url: string;
  //   class: string;
  // };
  // subclasses: {
  //   url: string;
  //   name: string;
  // }[];
  // spellcasting: {
  //   url: string;
  //   class: string;
  // };
  // spells: {
  //   url: string;
  //   class: string;
  // };
  // url: string;
  // features: {
  //   url: string;
  //   name: string;
  // }[];
}

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
      `https://www.dnd5eapi.co/api/classes/${className}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch class data");
    }

    const data: ClassDataProps = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
