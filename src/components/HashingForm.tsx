import { ChangeEvent, FormEvent, useState } from "react";
import CryptoJS from "crypto-js";
import CheckboxGroup from "./CheckBox";
import classes from "./HashingForm.module.css";

function HashingForm() {
  const [inputValue, setInputValue] = useState<string>("");
  const [hashedValue, setHashedValue] = useState<string>("");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleCheckboxChange = (selectedAlgorithm: string) => {
    setSelectedAlgorithm(selectedAlgorithm);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let hash = "";
    if (selectedAlgorithm === "md5") {
      hash = CryptoJS.MD5(inputValue).toString();
    } else if (selectedAlgorithm === "sha256") {
      hash = CryptoJS.SHA256(inputValue).toString();
    } else if (selectedAlgorithm === "sha1") {
      hash = CryptoJS.SHA1(inputValue).toString();
    }
    setHashedValue(hash);
  };

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <div className={classes.formGroup}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter text or number"
            className={classes.input}
          />
          <button type="submit" className={classes.button}>
            Hash
          </button>
        </div>
        <CheckboxGroup
          selectedAlgorithm={selectedAlgorithm}
          onCheckboxChange={handleCheckboxChange}
        />
      </form>
      {hashedValue && (
        <div className={classes.output}>
          <h2>Hashed Value</h2>
          <textarea value={hashedValue} readOnly />
        </div>
      )}
    </div>
  );
}

export default HashingForm;
