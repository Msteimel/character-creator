import React, { ChangeEvent, useState } from "react";
import cx from "classnames";
import "./textField.css";
import { Label } from "components/Label/Label";
import { TextInput } from "components/TextInput/TextInput";

export interface TextFieldProps {
  /**
   * Additional class name for the container
   */
  className?: string;
  /**
   * Label for input
   */
  label?: string;
  /**
   * Id of the input
   */
  id?: string;

  /**
   * Required state for input
   */
  required?: boolean;
  /**
   * Error state
   */
  error?: string;
  /**
   * Placeholder for input
   */
  placeholder?: string;
  /**
   * Value for input
   */
  value?: string;
  /**
   * Default value for input
   */
  defaultValue?: string;
  /**
   * Label of displayed value
   */
  displayValueLabel?: string;
  /**
   * change event handler
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const TextField = ({
  className,
  label,
  id,
  required,
  error,
  placeholder,
  defaultValue,
  displayValueLabel,
  onChange,
}: TextFieldProps) => {
  // Initialize state for the input value
  const [inputValue, setInputValue] = useState(defaultValue || "");

  // Custom onChange handler to update state
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // Update the state with new input value

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
        text={label}
        required={required}
      />
      <TextInput
        id={id}
        name={id}
        placeholder={placeholder}
        value={inputValue} // Controlled component
        onChange={handleChange}
      />
      {/* Display the label and the current input value */}
      {displayValueLabel && (
        <span className="text-field__display-label">{`${displayValueLabel} ${inputValue}`}</span>
      )}
    </div>
  );
};
