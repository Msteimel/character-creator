import React, { useState, useEffect } from "react";
import cx from "classnames";
import {
  CheckboxFieldItem,
  CheckboxFieldItemProps,
} from "components/CheckboxFieldItem/CheckboxFieldItem";

import "./checkboxField.css";

interface checkboxItem extends CheckboxFieldItemProps {}

export interface CheckboxFieldProps {
  /**
   * Additional class names to apply to the checkbox field item.
   */
  className?: string;
  /**
   * The checkbox's legend.
   */
  legend?: string;
  /**
   * The checkbox's id.
   */
  id?: string;
  /**
   * The checkbox item elements.
   */
  checkboxItems: checkboxItem | checkboxItem[];
  error?: boolean;
  maxChecked?: number;
  required?: boolean;
  /**
   * change event handler
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckboxField = ({
  className,
  legend,
  id,
  checkboxItems,
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

    setCheckedIds((prev) => {
      const newCheckedIds = checked
        ? [...prev, id]
        : prev.filter((checkboxId) => checkboxId !== id);

      return newCheckedIds;
    });

    if (onChange) {
      onChange(event);
    }
  };

  useEffect(() => {
    if (maxChecked && checkedIds.length > maxChecked) {
      setIsError(true);
      setErrorMessages(`You can only select up to ${maxChecked} items`);
    } else if (required && checkedIds.length === 0) {
      setIsError(true);
      setErrorMessages("This field is required");
    } else {
      setIsError(false);
      setErrorMessages("");
    }
  }, [checkedIds, maxChecked, required]);

  const componentClassName = cx("checkbox-input", className);

  return (
    <fieldset className={componentClassName} id={id} {...other}>
      {legend && <legend className="checkbox-input__legend">{legend}</legend>}
      {isError && (
        <span className="checkbox-input__error">Error: {errorMessages}</span>
      )}
      <ul>
        {Array.isArray(checkboxItems)
          ? checkboxItems.map((checkboxItem, index) => (
              <CheckboxFieldItem
                key={index}
                onChange={handleChange}
                {...checkboxItem}
              />
            ))
          : [
              <CheckboxFieldItem
                key={0}
                onChange={handleChange}
                {...checkboxItems}
              />,
            ]}
      </ul>
    </fieldset>
  );
};
