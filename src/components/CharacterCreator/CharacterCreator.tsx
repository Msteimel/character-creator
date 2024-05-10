import React, { useState, useEffect, ChangeEvent } from "react";
import cx from "classnames";
import "./characterCreator.css";

import { TextField } from "components/TextField/TextField";
import { SelectField } from "components/SelectField/SelectField";
import { CheckboxField } from "components/CheckboxField/CheckboxField";
import { StatInput } from "components/StatInput/StatInput";

export interface CharacterClassesProps {
  value: string;
  label: string;
}

export interface CharacterCreatorProps {
  className?: string;
}

export interface CharacterStatsProps {
  [key: string]: {
    value: number;
    modifier: number;
  };
}

const stats = [
  { id: "strength", label: "Strength" },
  { id: "intelligence", label: "Intelligence" },
  { id: "dexterity", label: "Dexterity" },
  { id: "wisdom", label: "Wisdom" },
  { id: "charisma", label: "Charisma" },
  { id: "constitution", label: "Constitution" },
];

const skills = [
  {
    id: "acrobatics",
    value: "acrobatics",
    label: "Acrobatics",
    attribute: "dexterity",
    secondaryLabel: "(Dex)",
  },
  {
    id: "animal-handling",
    value: "animal-handling",
    label: "Animal Handling",
    attribute: "wisdom",
    secondaryLabel: "(Wis)",
  },
  {
    id: "arcana",
    value: "arcana",
    label: "Arcana",
    attribute: "intelligence",
    secondaryLabel: "(Int)",
  },
  {
    id: "athletics",
    value: "athletics",
    label: "Athletics",
    attribute: "strength",
    secondaryLabel: "(Str)",
  },
  {
    id: "deception",
    value: "deception",
    label: "Deception",
    attribute: "charisma",
    secondaryLabel: "(Cha)",
  },
  {
    id: "history",
    value: "history",
    label: "History",
    attribute: "intelligence",
    secondaryLabel: "(Int)",
  },
  {
    id: "insight",
    value: "insight",
    label: "Insight",
    attribute: "wisdom",
    secondaryLabel: "(Wis)",
  },
  {
    id: "intimidation",
    value: "intimidation",
    label: "Intimidation",
    attribute: "charisma",
    secondaryLabel: "(Cha)",
  },
  {
    id: "investigation",
    value: "investigation",
    label: "Investigation",
    attribute: "intelligence",
    secondaryLabel: "(Int)",
  },
  {
    id: "medicine",
    value: "medicine",
    label: "Medicine",
    attribute: "wisdom",
    secondaryLabel: "(Wis)",
  },
  {
    id: "nature",
    value: "nature",
    label: "Nature",
    attribute: "intelligence",
    secondaryLabel: "(Int)",
  },
  {
    id: "perception",
    value: "perception",
    label: "Perception",
    attribute: "wisdom",
    secondaryLabel: "(Wis)",
  },
  {
    id: "performance",
    value: "performance",
    label: "Performance",
    attribute: "charisma",
    secondaryLabel: "(Cha)",
  },
  {
    id: "persuasion",
    value: "persuasion",
    label: "Persuasion",
    attribute: "charisma",
    secondaryLabel: "(Cha)",
  },
  {
    id: "religion",
    value: "religion",
    label: "Religion",
    attribute: "intelligence",
    secondaryLabel: "(Int)",
  },
  {
    id: "sleight-of-hand",
    value: "sleight-of-hand",
    label: "Sleight of Hand",
    attribute: "dexterity",
    secondaryLabel: "(Dex)",
  },
  {
    id: "stealth",
    value: "stealth",
    label: "Stealth",
    attribute: "dexterity",
    secondaryLabel: "(Dex)",
  },
  {
    id: "survival",
    value: "survival",
    label: "Survival",
    attribute: "wisdom",
    secondaryLabel: "(Wis)",
  },
];

interface AttributeModifiersProps {
  attribute: string;
  skill: string;
  modifier: number;
  proficient: boolean;
  proficientBonus: number;
  raceBonus?: number;
}

const AttributeModifiers = ({
  skill,
  attribute,
  modifier,
  proficient = false,
  proficientBonus = 1,
  raceBonus = 0,
}: AttributeModifiersProps) => {
  let totalModifier = modifier + raceBonus;

  if (proficient) {
    totalModifier += proficientBonus;
  }

  return (
    <div>
      <strong>{skill}:</strong> {attribute} {totalModifier}{" "}
      {proficient && "proficient"}
    </div>
  );
};

export const CharacterCreator = ({ className }: CharacterCreatorProps) => {
  const [characterClasses, setCharacterClasses] = useState<
    CharacterClassesProps[]
  >([]);
  const [characterName, setCharacterName] = useState<string>("");
  const [characterLevel, setCharacterLevel] = useState<number>(1);
  const [proficiencyBonus, setProficiencyBonus] = useState<number>(2);
  const [classValue, setClassValue] = useState<string | undefined>("");
  const [checkedAttributes, setCheckedAttributes] = useState<string[]>([]);
  const [characterStats, setCharacterStat] = useState<CharacterStatsProps>({
    strength: { value: 10, modifier: 0 },
    dexterity: { value: 10, modifier: 0 },
    constitution: { value: 10, modifier: 0 },
    intelligence: { value: 10, modifier: 0 },
    wisdom: { value: 10, modifier: 0 },
    charisma: { value: 10, modifier: 0 },
  });

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch("https://www.dnd5eapi.co/api/classes/", {
          method: "GET",
          headers: { Accept: "application/json" },
          redirect: "follow",
        });
        const data = await response.json();
        const mappedData = data.results.map((item: any) => ({
          value: item.index,
          label: item.name,
        }));
        setCharacterClasses(mappedData);
        if (mappedData.length > 0) {
          setClassValue(mappedData[0].label); // Set default class if you want
        }
      } catch (error) {
        console.error("Failed to fetch classes:", error);
      }
    };

    fetchClasses();
  }, []);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCharacterName(event.target.value);
  };

  const handleLevelChange = (event: ChangeEvent<HTMLInputElement>) => {
    const level = parseInt(event.target.value);

    if (level <= 1) {
      setProficiencyBonus(2);
    } else if (level <= 5) {
      setProficiencyBonus(3);
    } else if (level <= 9) {
      setProficiencyBonus(4);
    } else if (level <= 13) {
      setProficiencyBonus(5);
    } else if (level <= 17) {
      setProficiencyBonus(6);
    }

    setCharacterLevel(level);
  };

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedLabel =
      characterClasses.find((option) => option.value === selectedValue)
        ?.label || "";
    setClassValue(selectedLabel); // Assuming you want to display the label
  };

  const handleAttributesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const attribute = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setCheckedAttributes((prevAttributes) => [...prevAttributes, attribute]);
    } else {
      setCheckedAttributes((prevAttributes) =>
        prevAttributes.filter((attr) => attr !== attribute),
      );
    }

    console.log(checkedAttributes);
  };

  const handleStatChange = (event: ChangeEvent<HTMLInputElement>) => {
    let statModifier: number = 0;
    const statId = event.target.id;
    const statValue = parseInt(event.target.value);

    if (statValue >= 20) {
      statModifier = 5;
    } else if (statValue >= 18) {
      statModifier = 4;
    } else if (statValue >= 16) {
      statModifier = 3;
    } else if (statValue >= 14) {
      statModifier = 2;
    } else if (statValue >= 12) {
      statModifier = 1;
    } else if (statValue >= 10) {
      statModifier = 0;
    } else if (statValue >= 8) {
      statModifier = -1;
    } else if (statValue >= 6) {
      statModifier = -2;
    } else if (statValue >= 4) {
      statModifier = -3;
    } else if (statValue >= 2) {
      statModifier = -4;
    } else {
      statModifier = -5;
    }

    setCharacterStat((prevStats) => ({
      ...prevStats,
      [statId]: {
        value: statValue,
        modifier: statModifier,
      },
    }));
  };

  const componentClassName = cx("character-creator", className);

  return (
    <div className={componentClassName}>
      <TextField
        label="Character Name"
        id="character-name"
        placeholder="Enter character name"
        onChange={handleNameChange}
      />
      <SelectField
        label="Character Class"
        id="character-class"
        options={characterClasses}
        value={classValue}
        onChange={handleClassChange}
      />
      <TextField
        label="Character Level"
        id="character-level"
        type="number"
        minNumber={1}
        maxNumber={20}
        value={characterLevel}
        onChange={handleLevelChange}
      />

      <div className="stats">
        {stats.map((stat) => (
          <StatInput
            key={stat.id}
            label={stat.label}
            id={stat.id}
            defaultValue={10}
            onChange={handleStatChange}
          />
        ))}
      </div>
      <CheckboxField
        legend="Character Attributes"
        checkboxItems={skills}
        onChange={handleAttributesChange}
        required
        maxChecked={2}
      />

      <div className="character-creator__display">
        <p>
          <strong>Name: </strong>
          {characterName} <span id="character-name-display"></span>
        </p>
        <p>
          <strong>Level:</strong> {characterLevel}
        </p>
        <p>
          <strong>Proficiency Bonus:</strong> +{proficiencyBonus}
        </p>
        <p>
          <strong>Class:</strong>{" "}
          <span id="character-class-display">{classValue}</span>
        </p>
        <p>
          <span id="character-attributes-display">
            {checkedAttributes.join(", ")}
          </span>
        </p>
        <div>
          <strong>Stats:</strong>
          <ul>
            {Object.entries(characterStats).map(([stat, value]) => (
              <li key={stat}>
                <strong>{stat}:</strong> {value.value.toString()}, Mod{" "}
                {value.modifier.toString() > "0"
                  ? `+${value.modifier}`
                  : value.modifier}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <strong>Attributes:</strong>{" "}
        {skills.map((skill) => (
          <AttributeModifiers
            key={skill.id}
            skill={skill.label}
            attribute={skill.attribute}
            modifier={characterStats[skill.attribute].modifier}
            proficient={checkedAttributes.includes(skill.value)}
            proficientBonus={proficiencyBonus}
          />
        ))}
      </div>
    </div>
  );
};

export default CharacterCreator;
