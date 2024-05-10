import React from "react";
import cx from "classnames";
import "./select.css";

export interface SelectProps
  extends React.InputHTMLAttributes<HTMLSelectElement> {
  /**
   * Additional class names to apply to the select.
   */
  className?: string;
  /**
   * The select's id.
   */
  id?: string;
  /**
   * The select's name.
   */
  name?: string;
  /**
   * The select's value.
   */
  value?: string | undefined;
  /**
   * The select's options.
   */
  options: Array<{
    value: string;
    label: string;
  }>;
  /**
   * Whether the select is disabled.
   */
  disabled?: boolean;
  /**
   * Error state for the select.
   */
  error?: boolean;
  /**
   * Callback for when the select value changes.
   */
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select = ({
  className,
  id,
  name,
  value,
  options,
  disabled,
  error,
  onChange,
}: SelectProps) => {
  const componentClassName = cx("select", className, {
    "select--error": error,
  });

  return (
    <select
      className={componentClassName}
      id={id}
      name={name}
      value={value}
      disabled={disabled}
      onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
