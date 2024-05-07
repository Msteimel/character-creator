import React, { useState, ChangeEvent } from "react";
import cx from "classnames";
import "./characterCreator.css";

import { TextField } from "components/TextField/TextField";
import { SelectField } from "components/SelectField/SelectField";
import { CheckboxField } from "components/CheckboxField/CheckboxField";

export interface characterClassesProps {
  value: string;
  label: string;
}

const characterClasses = [
  { value: "warrior", label: "Warrior" },
  { value: "mage", label: "Mage" },
  { value: "rogue", label: "Rogue" },
];

const characterAttributes = [
  { value: "strength", label: "Strength" },
  { value: "intelligence", label: "Intelligence" },
  { value: "dexterity", label: "Dexterity" },
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
  const [checkedAttributes, setCheckedAttributes] = useState<string[]>([]);

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

  const handleAttributesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    const isChecked = event.target.checked;

    if (isChecked) {
      setCheckedAttributes([...checkedAttributes, capitalizedValue]);
    } else {
      setCheckedAttributes(
        checkedAttributes.filter(
          (checkedAttribute) => checkedAttribute !== capitalizedValue,
        ),
      );
    }

    console.log(checkedAttributes);
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
      <CheckboxField
        legend="Character Attributes"
        checkboxItems={characterAttributes}
        onChange={handleAttributesChange}
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
        <p>
          <strong>Attributes:</strong>{" "}
          <span id="character-attributes-display">
            {checkedAttributes.join(", ")}
          </span>
        </p>
      </div>
    </div>
  );
};

export default CharacterCreator;
