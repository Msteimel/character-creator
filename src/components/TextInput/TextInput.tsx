import React, { ChangeEvent, useState } from "react";
import cx from "classnames";
import "./textInput.css";

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Additional class names to apply to the text input.
   */
  className?: string;
  /**
   * Whether the text input is disabled.
   */
  disabled?: boolean;
  /**
   * The text input's id.
   */
  id?: string;
  /**
   * html name attribute
   */
  name?: string;
  /**
   * The text input's placeholder.
   */
  placeholder?: string;
  /**
   * The text input's input mode.
   */
  inputMode?:
    | "text"
    | "none"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search";
  /**
   * The text input's type.
   */
  type?: "text" | "number" | "email" | "tel" | "password" | "search" | "url";
  /**
   * The text input's value.
   */
  value?: string | number;
  /**
   * The text input's default value.
   */
  defaultValue?: string | number;
  /*
   * The minimum number allowed in the input
   */
  minNumber?: number;
  /*
   * The maximum number allowed in the input
   */
  maxNumber?: number;
  /**
   * Whether the text input is required.
   */
  required?: boolean;
  /**
   * Callback function to handle changes to the text input.
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput = ({
  className,
  disabled = false,
  id,
  name,
  placeholder,
  inputMode,
  value,
  defaultValue,
  type = "text",
  minNumber = 0,
  maxNumber,
  required = false,
  onChange,
  ...props
}: TextInputProps) => {
  // const [inputValue, setInputValue] = useState(defaultValue || "");

  const componentClassName = cx("text-input", className, {
    "text-input--disabled": disabled,
  });

  // const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(event.target.value);

  //   if (onChange) {
  //     onChange(event);
  //   }
  // };

  return (
    <input
      className={componentClassName}
      disabled={disabled}
      id={id}
      name={name}
      placeholder={placeholder}
      inputMode={inputMode}
      type={type}
      value={value}
      min={minNumber}
      max={maxNumber}
      defaultValue={defaultValue}
      onChange={onChange}
      required={required}
      {...props}
    />
  );
};
