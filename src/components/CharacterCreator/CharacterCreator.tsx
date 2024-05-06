import React, { useState, ChangeEvent } from "react";
import cx from "classnames";
import "./characterCreator.css";

import { TextField } from "components/TextField/TextField";
import { SelectField } from "components/SelectField/SelectField";

export interface characterClassesProps {
  value: string;
  label: string;
}

const characterClasses = [
  { value: "warrior", label: "Warrior" },
  { value: "mage", label: "Mage" },
  { value: "rogue", label: "Rogue" },
];

export interface CharacterCreatorProps {
  /**
   * Additional class names to apply to the character creator.
   */
  className?: string;
}

export const CharacterCreator = ({ className }: CharacterCreatorProps) => {
  const [characterName, setCharacterName] = useState<string>(" ");
  const [classValue, setClassValue] = useState<string | undefined>(
    characterClasses[0].label || "",
  );

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCharacterName(event.target.value); // Update the state with new input value
  };

  // Custom onChange handler to update state
  const handleClassChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedClassLabel: string | undefined = characterClasses.find(
      (characterClass) => characterClass.value === event.target.value,
    )?.label;

    setClassValue(selectedClassLabel); // Update the state with new input value
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
        onChange={handleClassChange}
      />

      <div className="character-creator__display">
        <p>
          <strong>Name: </strong>
          {characterName} <span id="character-name-display"></span>
        </p>
        <p>
          <strong>Class:</strong>{" "}
          <span id="character-class-display">{classValue}</span>
        </p>
      </div>
    </div>
  );
};

export default CharacterCreator;
