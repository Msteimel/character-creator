import React from "react";
import cx from "classnames";

export interface LabelProps {
  /**
   * Additional class names to apply to the label.
   */
  className?: string;
  /**
   * The label's id.
   */
  id?: string;
  /**
   * HTML `for` attribute, which maps the label to an associated input `id`
   */
  htmlFor?: string;
  /**
   * The label label string
   */
  label?: string | boolean;
  /**
   * The secondary label string
   */
  secondaryLabel?: string;
  /**
   * Whether the label is required.
   */
  required?: boolean;
  /**
   * Error state for the label.
   */
  error?: boolean;
}

export const Label = ({
  className,
  id,
  htmlFor,
  label,
  secondaryLabel,
  required = false,
  error = false,
  ...other
}: LabelProps) => {
  const componentClassName = cx("label", className, {
    "label--required": required,
    "label--error": error,
  });

  return (
    <label className={componentClassName} id={id} htmlFor={htmlFor} {...other}>
      <span>{label}</span> {secondaryLabel && <i>{secondaryLabel}</i>}{" "}
      {error ? "Error" : ""} {required ? "*" : ""}
    </label>
  );
};
