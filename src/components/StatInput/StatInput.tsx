import React, { useState, useEffect } from "react";
import cx from "classnames";
import { TextField, TextFieldProps } from "components/TextField/TextField";
import "./statInput.css";

export interface StatInputProps extends TextFieldProps {}

export const StatInput = ({
  className,
  label,
  id,
  disabled = false,
  required = false,
  error = false,
  placeholder,
  inputMode = `numeric`,
  defaultValue,
  displayValueLabel,
  onChange,
}: StatInputProps) => {
  const [inputValue, setInputValue] = useState<number | string>(
    defaultValue || "",
  );
  const [statModifier, setStatModifier] = useState<"+" | "-">("+");
  const [statValue, setStatValue] = useState<number | string>(
    defaultValue || "",
  );

  const componentClassName = cx("stat-input", className, {
    "stat-input--error": error,
  });

  const handleStatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  useEffect(() => {
    const stringInputValue = parseInt(String(inputValue));

    if (inputValue) {
      if (stringInputValue >= 10) {
        setStatModifier("+");
        if (stringInputValue >= 20) {
          setStatValue("5");
        } else if (stringInputValue >= 18) {
          setStatValue("4");
        } else if (stringInputValue >= 16) {
          setStatValue("3");
        } else if (stringInputValue >= 14) {
          setStatValue("2");
        } else if (stringInputValue >= 12) {
          setStatValue("1");
        } else if (stringInputValue >= 10) {
          setStatValue("0");
        }
      } else {
        setStatModifier("-");
        if (stringInputValue < 2) {
          setStatValue("5");
        } else if (stringInputValue < 4) {
          setStatValue("4");
        } else if (stringInputValue < 6) {
          setStatValue("3");
        } else if (stringInputValue < 8) {
          setStatValue("2");
        } else if (stringInputValue < 10) {
          setStatValue("1");
        }
      }
    }
  }, [inputValue]);

  return (
    <TextField
      className={componentClassName}
      label={label}
      id={id}
      disabled={disabled}
      required={required}
      error={error}
      inputMode={inputMode}
      type="number"
      minNumber={0}
      maxNumber={20}
      placeholder={placeholder}
      defaultValue={defaultValue}
      displayValue={statValue}
      displayValueLabel={statModifier}
      onChange={handleStatChange}
    />
  );
};
