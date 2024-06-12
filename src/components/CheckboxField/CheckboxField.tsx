import React, { useState } from "react";
import cx from "classnames";
import {
  CheckboxFieldItem,
  CheckboxFieldItemProps,
} from "@components/CheckboxFieldItem/CheckboxFieldItem";

import "./checkboxField.css";

export interface CheckboxFieldProps {
  className?: string;
  legend?: string;
  id?: string;
  children?:
    | React.ReactElement<CheckboxFieldItemProps>
    | React.ReactElement<CheckboxFieldItemProps>[];
  description?: string;
  error?: boolean;
  maxChecked?: number;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckboxField = ({
  className,
  legend,
  id,
  children,
  description,
  onChange,
  maxChecked,
  error = false,
  required = false,
  ...other
}: CheckboxFieldProps) => {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [isError, setIsError] = useState(error);
  const [errorMessages, setErrorMessages] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;

    let updatedCheckedIds = checked
      ? [...checkedIds, id]
      : checkedIds.filter((checkboxId) => checkboxId !== id);

    // Validate selections
    if (maxChecked && updatedCheckedIds.length > maxChecked) {
      setIsError(true);
      setErrorMessages(`You can only select up to ${maxChecked} items`);
    } else if (required && updatedCheckedIds.length === 0) {
      setIsError(true);
      setErrorMessages("This field is required");
    } else {
      setIsError(false);
      setErrorMessages("");
    }

    setCheckedIds(updatedCheckedIds);

    if (onChange) {
      onChange(event);
    }
  };

  const componentClassName = cx("checkbox-field", className);

  return (
    <fieldset className={componentClassName} id={id} {...other}>
      {legend && <legend className="checkbox-field__legend">{legend}</legend>}
      {description && <p className="checkbox-field__desc">{description}</p>}
      {isError && (
        <span className="checkbox-field__error">Error: {errorMessages}</span>
      )}
      <ul>
        {React.Children.map(children, (child) =>
          React.cloneElement(child, { onChange: handleChange }),
        )}
      </ul>
    </fieldset>
  );
};
