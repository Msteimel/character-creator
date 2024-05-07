import React, { ChangeEventHandler, useEffect, useState } from "react";
import cx from "classnames";
import { Label, LabelProps } from "components/Label/Label";
import {
  CheckboxInput,
  CheckboxInputProps,
} from "components/CheckboxInput/CheckboxInput";

import "./checkboxFieldItem.css";

export interface CheckboxFieldItemProps extends LabelProps, CheckboxInputProps {
  /**
   * Additional class names to apply to the checkbox field item.
   */
  label?: string;
}

export const CheckboxFieldItem = ({
  className,
  label,
  id,
  checked = false,
  disabled = false,
  required = false,
  error = false,
  value,
  onChange,
}: CheckboxFieldItemProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setIsChecked(event.target.checked);

    if (onChange) {
      onChange(event);
    }
  };

  const componentClassName = cx("checkbox-field-item", className, {
    "checkbox-field-item--error": error,
  });

  return (
    <li className={componentClassName}>
      <CheckboxInput
        id={id}
        name={id}
        checked={isChecked}
        disabled={disabled}
        value={value}
        required={required}
        onChange={handleChange}
      />
      <Label
        className="checkbox-field-item__label"
        htmlFor={id}
        text={label}
        required={required}
        error={error}
      />
    </li>
  );
};
