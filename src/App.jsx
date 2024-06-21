import React, { useState, useEffect } from "react";
import Button from "./components/Button"; // Importing the Button component
import Confetti from "react-confetti-explosion"; // Importing Confetti component for visual effect
import "./App.css"; 
import { Textfit } from "react-textfit"; // Importing Textfit for responsive text display

function App() {
  // Defining state variables using the useState hook
  const [data, setData] = useState(""); // For displaying input/output
  const [memory, setMemory] = useState(0); // For memory operations
  const [showConfetti, setShowConfetti] = useState(false); // To trigger confetti effect
  const [isSecond, setIsSecond] = useState(false); // Toggle for second set of functions
  const [inDegrees, setInDegrees] = useState(true); // Toggle for degree/radian mode
  const [theme, setTheme] = useState("light"); // Toggle for light/dark theme
  const [history, setHistory] = useState([]); // To keep calculation history

  // Function to check if the result contains 5.6 or 6.5 to trigger confetti
  const checkConfetti = () => {
    const regex = /\b5\b.\b6\b|\b6\b.\b5\b/;
    if (regex.test(data)) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); // Show confetti for 5 seconds
    }
  };

  // useEffect to update theme class on the document element
  useEffect(() => {
    document.documentElement.className = theme;
    document.body.style.backgroundColor = theme === 'dark' ? '#1a202c' : '#f7fafc';
  }, [theme]);

  // Handler for button click to append value to data
  function handleButton(e) {
    setData(data.concat(e.target.value));
  }

  // Function to evaluate the expression and handle result
  function calculation() {
    try {
      const result = eval(data).toString();
      checkConfetti(); // Check for confetti triggering numbers
      setHistory([...history, `${data} = ${result}`]); // Update history
      setData(result); // Set result as the new data
    } catch (error) {
      setData("Error"); // Handle error in evaluation
    }
  }

  // Function to calculate percentage
  function percentage() {
    const result = (parseFloat(data) / 100).toString();
    setData(result);
  }

  // Function to clear all input
  function clear_all() {
    setData("");
  }

  // Function to change sign of the number
  function change_sign() {
    const result = (parseFloat(data) * -1).toString();
    setData(result);
  }

  // Memory operations
  function memoryClear() {
    setMemory(0);
  }

  function memoryAdd() {
    setMemory(memory + parseFloat(data));
    setData("");
  }

  function memorySubtract() {
    setMemory(memory - parseFloat(data));
    setData("");
  }

  function memoryRecall() {
    setData(memory.toString());
  }

  // Toggle between first and second set of functions
  function toggleSecond() {
    setIsSecond(!isSecond);
  }

  // Toggle between degrees and radians
  function toggleRadDeg() {
    setInDegrees(!inDegrees);
  }

  // Mathematical operations
  function square() {
    const result = Math.pow(parseFloat(data), 2).toString();
    setData(result);
  }

  function cube() {
    const result = Math.pow(parseFloat(data), 3).toString();
    setData(result);
  }

  function powerY() {
    const [base, exponent] = data.split("^");
    const result = Math.pow(parseFloat(base), parseFloat(exponent)).toString();
    setData(result);
  }

  function exp() {
    const result = Math.exp(parseFloat(data)).toString();
    setData(result);
  }

  function tenPower() {
    const result = Math.pow(10, parseFloat(data)).toString();
    setData(result);
  }

  function reciprocal() {
    const result = (1 / parseFloat(data)).toString();
    setData(result);
  }

  function sqrt() {
    const result = Math.sqrt(parseFloat(data)).toString();
    setData(result);
  }

  function cbrt() {
    const result = Math.cbrt(parseFloat(data)).toString();
    setData(result);
  }

  function yRootX() {
    const [y, x] = data.split("√");
    const result = Math.pow(parseFloat(x), 1 / parseFloat(y)).toString();
    setData(result);
  }

  function ln() {
    const result = Math.log(parseFloat(data)).toString();
    setData(result);
  }

  function logTen() {
    const result = Math.log10(parseFloat(data)).toString();
    setData(result);
  }

  function factorial() {
    const n = parseInt(data);
    if (n === 0 || n === 1) {
      setData("1");
      return;
    }
    let result = 1;
    for (let i = n; i > 1; i--) {
      result *= i;
    }
    setData(result.toString());
  }

  function sin() {
    const angle = parseFloat(data);
    const result = inDegrees ? Math.sin(angle * (Math.PI / 180)) : Math.sin(angle);
    setData(result.toString());
  }

  function cos() {
    const angle = parseFloat(data);
    const result = inDegrees ? Math.cos(angle * (Math.PI / 180)) : Math.cos(angle);
    setData(result.toString());
  }

  function tan() {
    const angle = parseFloat(data);
    const result = inDegrees ? Math.tan(angle * (Math.PI / 180)) : Math.tan(angle);
    setData(result.toString());
  }

  function sinh() {
    const result = Math.sinh(parseFloat(data)).toString();
    setData(result);
  }

  function cosh() {
    const result = Math.cosh(parseFloat(data)).toString();
    setData(result);
  }

  function tanh() {
    const result = Math.tanh(parseFloat(data)).toString();
    setData(result);
  }

  // Functions to insert constants and random number
  function insertE() {
    setData(data.concat(Math.E.toString()));
  }

  function insertPi() {
    setData(data.concat(Math.PI.toString()));
  }

  function generateRandom() {
    const result = Math.random().toString();
    setData(result);
  }

  // Function for scientific notation
  function scientificNotation() {
    setData(data.concat("e"));
  }

  // Toggle between light and dark theme
  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <div className={`container ${theme} h-screen w-screen overflow-hidden`}>
      <div className="calculator">
        <Textfit className={`display w-[100%] sm:w-[70vw] md:w-[60vw] lg:w-[50vw] ${theme === 'dark' ? 'bg-white' : 'bg-dark_grey text-white'}`}>{data ? data : '0'}</Textfit>
        {showConfetti && <Confetti />}
        <Button
          handleButton={handleButton}
          calculation={calculation}
          percentage={percentage}
          change_sign={change_sign}
          clear_all={clear_all}
          memoryClear={memoryClear}
          memoryAdd={memoryAdd}
          memorySubtract={memorySubtract}
          memoryRecall={memoryRecall}
          toggleSecond={toggleSecond}
          isSecond={isSecond}
          square={square}
          cube={cube}
          powerY={powerY}
          exp={exp}
          tenPower={tenPower}
          reciprocal={reciprocal}
          sqrt={sqrt}
          cbrt={cbrt}
          yRootX={yRootX}
          ln={ln}
          logTen={logTen}
          factorial={factorial}
          sin={sin}
          cos={cos}
          tan={tan}
          sinh={sinh}
          cosh={cosh}
          tanh={tanh}
          insertE={insertE}
          insertPi={insertPi}
          generateRandom={generateRandom}
          scientificNotation={scientificNotation}
          toggleRadDeg={toggleRadDeg}
          toggleTheme={toggleTheme}
          theme={theme}
        />
      </div>
      <div className="history relative overflow-x-hidden">
        <h2 className={`${theme === "light" ? 'dark' : 'fixed z-10'}`}>History</h2>
        <ul className="absolute top-10 left-2">
          {history.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
