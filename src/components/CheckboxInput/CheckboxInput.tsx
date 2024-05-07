import React from "react";
import cx from "classnames";

import "./checkboxInput.css";

export interface CheckboxInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Additional class names to apply to the select.
   */
  className?: string;
  /**
   * The select's id.
   */
  id?: string;
  /**
   * Toggles whether or not the checkbox is checked or unchecked
   */
  checked?: boolean;
  /**
   * HTML name attribute for the checkbox
   */
  name?: string;
  /**
   * Disables the field and prevents editing the contents
   */
  disabled?: boolean;
  /**
   * A string representing the value of the checkbox
   */
  value?: string;
  /**
   * Function that fires when field value has changed
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

export const CheckboxInput = ({
  className,
  id,
  checked,
  name,
  disabled = false,
  value,
  onChange,
}: CheckboxInputProps) => {
  const componentClassName = cx("checkbox", className, {
    "checkbox--disabled": disabled,
  });

  return (
    <input
      className={componentClassName}
      type="checkbox"
      id={id}
      checked={checked}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};
