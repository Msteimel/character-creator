import React, { useState, ChangeEvent } from "react";
import cx from "classnames";
import "./selectField.css";
import { Label, LabelProps } from "components/Label/Label";
import { Select, SelectProps } from "components/Select/Select";

export interface SelectFieldProps extends SelectProps, LabelProps {
  /**
   * Label for input
   */
  label?: string;
  /**
   * Label of displayed value
   */
  displayValueLabel?: string;
}

export const SelectField = ({
  className,
  label,
  id,
  disabled = false,
  required = false,
  error = false,
  options,
  value,
  displayValueLabel,
  onChange,
}: SelectFieldProps) => {
  const [inputValue, setInputValue] = useState(options[0].label || "");

  // Custom onChange handler to update state
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setInputValue(event.target.value); // Update the state with new input value

    if (onChange) {
      onChange(event); // Call external onChange handler if provided
    }
  };

  const componentClassName = cx("select-field", className, {
    "select-field--error": error,
  });

  return (
    <div className={componentClassName}>
      <Label
        className="select-field__label"
        htmlFor={id}
        text={label}
        required={required}
      />
      <Select
        id={id}
        name={id}
        value={inputValue}
        options={options}
        disabled={disabled}
        error={error}
        onChange={handleChange}
      />
      {displayValueLabel && (
        <span className="text-field__display-label">{`${displayValueLabel} ${inputValue}`}</span>
      )}
    </div>
  );
};
