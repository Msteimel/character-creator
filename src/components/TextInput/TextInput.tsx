import React, { ChangeEvent } from "react";
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
   * The text input's value.
   */
  value?: string | number;
  /**
   * The text input's default value.
   */
  defaultValue?: string | number;
  /**
   * Callback function to handle changes to the text input.
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput = ({
  className,
  disabled,
  id,
  name,
  placeholder,
  value,
  defaultValue,
  onChange,
  ...props
}: TextInputProps) => {
  const componentClassName = cx("text-input", className, {
    "text-input--disabled": disabled,
  });

  return (
    <input
      className={componentClassName}
      disabled={disabled}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      {...props}
    />
  );
};
