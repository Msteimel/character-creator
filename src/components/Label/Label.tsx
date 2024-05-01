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
   * The label text string
   */
  text?: string | boolean;
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
  text,
  required,
  error,
  ...other
}: LabelProps) => {
  const componentClassName = cx("label", className);

  return (
    <label className={componentClassName} id={id} htmlFor={htmlFor} {...other}>
      {text}
    </label>
  );
};
