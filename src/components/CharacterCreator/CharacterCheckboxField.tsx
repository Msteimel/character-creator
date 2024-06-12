import React, { useState, useMemo } from "react";
import { CheckboxField } from "@components/CheckboxField/CheckboxField";
import { CheckboxFieldItem } from "@components/CheckboxFieldItem/CheckboxFieldItem";

interface ProficiencyChoiceProps {
  label: string;
  value: string;
  url: string;
}

export interface CharacterCheckboxFieldProps {
  characterSkills: any;
  proficiencyChoices: any;
  handleAttributesChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CharacterCheckboxField = ({
  characterSkills,
  proficiencyChoices,
  handleAttributesChange,
}: CharacterCheckboxFieldProps) => {
  const proficiencyOptionCount = useMemo(() => {
    if (!proficiencyChoices) {
      return 0;
    } else {
      return proficiencyChoices[0].choose;
    }
  }, [proficiencyChoices]);

  const proficiencyOptions: ProficiencyChoiceProps[] = [];

  proficiencyChoices?.[0]?.from.options.map((option: any) => {
    proficiencyOptions.push({
      label: option.item.name.replace("Skill: ", ""),
      value: option.item.index.replace("skill-", ""),
      url: option.item.url,
    });
  });

  // Create a set of all proficiency option labels
  const proficiencyOptionLabels = new Set(
    proficiencyOptions.map((option) => option.label),
  );

  return (
    <CheckboxField
      legend="Character Skills"
      description={`Choose ${proficiencyOptionCount} available skills.`}
      required
      maxChecked={proficiencyOptionCount}
      onChange={handleAttributesChange}>
      {characterSkills.skills.map((skill: any, index: number) => {
        const skillLabel = skill.label;
        const isDisabled = !proficiencyOptionLabels.has(skillLabel);

        return (
          <CheckboxFieldItem
            key={index}
            // onChange={handleAttributesChange}
            disabled={isDisabled}
            {...skill}
          />
        );
      })}
    </CheckboxField>
  );
};
