import { ChangeEvent, useState } from "react";

// classes
import classes from "./CheckboxGroup.module.css";

interface Props {
  selectedAlgorithm: string;
  onCheckboxChange: (selectedAlgorithm: string) => void;
}

function CheckboxGroup({ selectedAlgorithm, onCheckboxChange }: Props) {
  const [checkboxes, setCheckboxes] = useState([
    { id: "md5", label: "MD5", checked: false },
    { id: "sha256", label: "SHA-256", checked: false },
    { id: "sha1", label: "SHA-1", checked: false },
  ]);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = event.target;
    if (checked) {
      setCheckboxes((prevCheckboxes) =>
        prevCheckboxes.map((checkbox) =>
          checkbox.id === id
            ? { ...checkbox, checked: true }
            : { ...checkbox, checked: false }
        )
      );
      onCheckboxChange(id);
    } else {
      setCheckboxes((prevCheckboxes) =>
        prevCheckboxes.map((checkbox) =>
          checkbox.id === id ? { ...checkbox, checked: false } : checkbox
        )
      );
      onCheckboxChange("");
    }
  };

  return (
    <div className={classes.container}>
      <p className={classes.label}>Select Hashing Algorithm:</p>
      {checkboxes.map((checkbox) => (
        <label
          htmlFor={checkbox.id}
          key={checkbox.id}
          className={classes.checkboxLabel}
        >
          <input
            type="checkbox"
            id={checkbox.id}
            checked={checkbox.id === selectedAlgorithm}
            onChange={handleCheckboxChange}
          />
          {checkbox.label}
        </label>
      ))}
    </div>
  );
}

export default CheckboxGroup;
