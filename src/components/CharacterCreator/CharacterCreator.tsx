import React from "react";
import cx from "classnames";
import "./characterCreator.css";

import { TextInput } from "components/TextInput/TextInput";
import { Label } from "components/Label/Label";
import { TextField } from "components/TextField/TextField";

export interface CharacterCreatorProps {
  /**
   * Additional class names to apply to the character creator.
   */
  className?: string;
}

export const CharacterCreator = ({ className }: CharacterCreatorProps) => {
  const componentClassName = cx("character-creator", className);
  return (
    <div className={componentClassName}>
      <TextField
        label="Character Name"
        id="character-name"
        displayValueLabel="Name: "
        placeholder="Enter character name"
      />
    </div>
  );
};

export default CharacterCreator;
