import React, { useState, ChangeEvent } from "react";
import cx from "classnames";
import "./selectField.css";
import { Label, LabelProps } from "@components/Label/Label";
import { Select, SelectProps } from "@components/Select/Select";

export interface SelectFieldProps extends SelectProps, LabelProps {
  label?: string;
  displayValueLabel?: string;
}

export const SelectField = ({
  className,
  label,
  secondaryLabel,
  id,
  disabled = false,
  required = false,
  error = false,
  options,
  displayValueLabel,
  value, // Ensure this is passed from the parent component
  onChange,
}: SelectFieldProps) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue); // Update the internal state

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
        label={label}
        secondaryLabel={secondaryLabel}
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
        <span className="select-field__display-label">
          {displayValueLabel}: {inputValue}
        </span>
      )}
    </div>
  );
};
