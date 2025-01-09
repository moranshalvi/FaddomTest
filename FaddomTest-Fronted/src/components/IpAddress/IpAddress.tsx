import { FC, useState } from "react";
import classes from "./IpAddress.module.scss";
import ipRegex from "./ipRegex";

interface IpAddressProps {
  value: string;
  onChange: (value: string) => void;
}

const IpAddress: FC<IpAddressProps> = ({ value, onChange }) => {
  const [isValid, setIsValid] = useState(true);

  const validateIp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ipRegexTest = ipRegex;
    const inputValue = e.target.value;
    setIsValid(ipRegexTest.test(inputValue));
    onChange(inputValue);
  };

  return (
    <div className={classes.container}>
      <label>IP Address: </label>
      <input
        type="text"
        id="ipAddress"
        value={value}
        onChange={validateIp}
        className={`${classes.input} ${!isValid ? classes.inputInvalid : ""}`}
      />
      {!isValid && (
        <span className={classes.errorMessage}>Invalid IP Address</span>
      )}
    </div>
  );
};

export default IpAddress;
