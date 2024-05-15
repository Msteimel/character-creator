import React, { ChangeEvent, useEffect, useState } from "react";
import cx from "classnames";
import "./textField.css";
import { Label, LabelProps } from "components/Label/Label";
import { TextInput, TextInputProps } from "components/TextInput/TextInput";

export interface TextFieldProps extends TextInputProps, LabelProps {
  /**
   * Label for input
   */
  label?: string;
  /**
   * Label of displayed value
   */
  displayValueLabel?: string | number | undefined;
  /**
   * value of displayed value
   */
  displayValue?: string | number | undefined;
}

export const TextField = ({
  className,
  label,
  secondaryLabel,
  id,
  disabled = false,
  required = false,
  error = false,
  inputMode,
  minNumber,
  maxNumber,
  type = "text",
  placeholder,
  defaultValue,
  displayValue,
  displayValueLabel,
  onChange,
}: TextFieldProps) => {
  // Initialize state for the input value
  const [inputValue, setInputValue] = useState(defaultValue || "");
  const [isError, setIsError] = useState(false);

  // Custom onChange handler to update state
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // Update the state with new input value

    // Check if the input is a number and within the min/max range
    if (type === "number") {
      let value = parseInt(event.target.value);
      if (isNaN(value)) {
        value = 0;
      }
      if (minNumber !== undefined && value < minNumber) {
        value = minNumber;
      }
      if (maxNumber !== undefined && value > maxNumber) {
        value = maxNumber;
      }
      setInputValue(value.toString());
    }

    if (onChange) {
      onChange(event); // Call external onChange handler if provided
    }
  };

  const componentClassName = cx("text-field", className, {
    "text-field--error": error,
  });

  return (
    <div className={componentClassName}>
      <Label
        className="text-field__label"
        htmlFor={id}
        label={label}
        secondaryLabel={secondaryLabel}
        required={required}
        error={isError}
      />
      <TextInput
        id={id}
        name={id}
        placeholder={placeholder}
        value={inputValue} // Controlled component
        inputMode={inputMode}
        type={type}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        min={minNumber}
        max={maxNumber}
      />
      {/* Display the label and the current input value */}
      {displayValueLabel && (
        <span className="text-field__display-label">
          {displayValueLabel} {displayValue ? displayValue : inputValue}
        </span>
      )}
    </div>
  );
};
