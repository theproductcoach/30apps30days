"use client";

import { useState, useEffect } from "react";
import { Combobox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import styles from "./ComboboxInput.module.css";

type Props = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  id: string;
};

export default function ComboboxInput({
  options,
  value,
  onChange,
  label,
  id,
}: Props) {
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) => {
          return option.toLowerCase().includes(query.toLowerCase());
        });

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <Combobox value={value} onChange={onChange}>
        <div className={styles.container}>
          <Combobox.Label className={styles.label}>{label}</Combobox.Label>
          <div className={styles.inputWrapper}>
            <Combobox.Input
              id={id}
              className={styles.input}
              onChange={(event) => {
                setQuery(event.target.value);
                onChange(event.target.value);
              }}
              displayValue={(value: string) => value}
              autoComplete="off"
            />
            <Combobox.Button className={styles.button}>
              <ChevronUpDownIcon className={styles.icon} aria-hidden="true" />
            </Combobox.Button>
          </div>
          <Combobox.Options className={styles.options}>
            {filteredOptions.map((option) => (
              <Combobox.Option
                key={option}
                value={option}
                className={({ active }) =>
                  `${styles.option} ${active ? styles.optionActive : ""}`
                }
              >
                {({ selected, active }) => (
                  <span
                    className={`${selected ? styles.selected : ""} ${
                      active ? styles.active : ""
                    }`}
                  >
                    {option}
                  </span>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  );
}
