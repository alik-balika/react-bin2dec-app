import React, { useRef, useState, useEffect } from "react";

const App = () => {
  const [binaryInput, setBinaryInput] = useState("");
  const [decimalOutput, setDecimalOutput] = useState("");
  const [isError, setIsError] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleBlur = () => {
    inputRef.current.focus();
  };

  const handleInputChange = (e) => {
    const userInput = e.target.value;

    if (userInput === "") {
      setBinaryInput("");
      setDecimalOutput("");
      return;
    }

    if (!isValidBinaryNumber(userInput)) {
      if (!isError) {
        setIsError(true);

        setTimeout(() => {
          setIsError(false);
        }, 500);
      }

      return;
    }

    setBinaryInput(e.target.value);
    setDecimalOutput(binaryToDecimal(e.target.value));
  };

  const isValidBinaryNumber = (str) => {
    for (let i = 0; i < str.length; i++) {
      if (str[i] !== "0" && str[i] !== "1") {
        return false;
      }
    }
    return true;
  };

  const binaryToDecimal = (str) => {
    let decimal = 0;
    for (let i = 0; i < str.length; i++) {
      const digit = parseInt(str[i]);
      decimal = decimal * 2 + digit;
    }

    return decimal.toString();
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <h1 className="text-4xl font-bold">Bin2Dec</h1>
      <div className="mt-48 text-2xl text-center">
        <input
          ref={inputRef}
          className={`focus:outline-none w-96 text-center caret-transparent
          ${!binaryInput ? "pulse cursor-default" : ""} ${
            isError ? "shake text-red-500 placeholder-red-500" : ""
          }`}
          placeholder="Please enter a binary number"
          onBlur={handleBlur}
          value={binaryInput}
          onChange={handleInputChange}
        ></input>
        {decimalOutput && <p className="mt-10">{decimalOutput}</p>}
        {isError && <p className="text-red-500 fade-out">Naughty Naugthy</p>}
      </div>
      <p className="absolute bottom-0 mb-5">Made with ❤️ By Alik Balika</p>
    </div>
  );
};

export default App;
