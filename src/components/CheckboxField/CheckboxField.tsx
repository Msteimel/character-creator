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
  ...other
}: CheckboxFieldProps) => {
  // const [checkedValues, setCheckedValues] = useState<string[]>([]);

  const componentClassName = cx("checkbox-input", className);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <fieldset className={componentClassName} id={id} {...other}>
      {legend && <legend className="checkbox-input__legend">{legend}</legend>}
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
