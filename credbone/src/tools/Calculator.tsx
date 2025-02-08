import React, { useState } from "react";
import Ripple from "../components/Ripple";
import { useSnackbar } from "../components/snackbar/SnackbarContainer";

const Calculator: React.FC = () => {


  
  const { addSnackbar } = useSnackbar();


  const [input, setInput] = useState<string>("0");
  const [result, setResult] = useState<number | null>(null)
  const handleButtonClick = (value: string) => {
    const operators = /[\+\-\*/]/;
    const lastChar = input.slice(-1);
  
    // If input is "0", replace it with the first digit (unless an operator)
    if (input === "0" && !operators.test(value)) {
      setInput(value); // Replace "0" with the new digit
    } else if (!(operators.test(lastChar) && operators.test(value))) {
      // Add the input if it's not two consecutive operators
      setInput((prev) => prev + value);
    }
  };
  

  const handleClear = () => {
    setInput("0");
    setResult(null);
  };
  

  const calculateResult = () => {
    try {
      const evalResult = eval(input); // Use eval cautiously!
      setResult(evalResult);
    } catch (error) {
      setResult(null);
    //  alert("Invalid Expression");
      addSnackbar(<text data-ellipsis="">Check your expression.</text>, 2000, "custom-source", true);

      
    }
  };

  // Button mapping with labels and their corresponding actions
  const buttons: Array<{ label: string; action: () => void; type: string, background: string, color: string}> = [

    { color:"main-text", background:"main",  label: "C", action: handleClear, type: "wide" },
    { color:"", background:"",  label: "÷", action: () => handleButtonClick("/"), type: "" },
    { color:"", background:"",  label: "×", action: () => handleButtonClick("*"), type: "" },
    { color:"", background:"",  label: "7", action: () => handleButtonClick("7"), type: "" },
    { color:"", background:"",  label: "8", action: () => handleButtonClick("8"), type: "" },
    { color:"", background:"",  label: "9", action: () => handleButtonClick("9"), type: "" },
    { color:"", background:"",  label: "-", action: () => handleButtonClick("-"), type: "" },
    { color:"", background:"",  label: "4", action: () => handleButtonClick("4"), type: "" },
    { color:"", background:"",  label: "5", action: () => handleButtonClick("5"), type: "" },
    { color:"", background:"",  label: "6", action: () => handleButtonClick("6"), type: "" },
    { color:"", background:"",  label: "+", action: () => handleButtonClick("+"), type: "" },
    { color:"", background:"",  label: "1", action: () => handleButtonClick("1"), type: "" },
    { color:"", background:"",  label: "2", action: () => handleButtonClick("2"), type: "" },
    { color:"", background:"",  label: "3", action: () => handleButtonClick("3"), type: "" },
    { color:"ember-lighter", background:"ember-light", label: "=", action: calculateResult, type: "tall" },
    { color:"", background:"", label: "0", action: () => handleButtonClick("0"), type: "wide" },
    { color:"", background:"", label: ".", action: () => handleButtonClick("."), type: "" },
   
  ];

  return (
    
    <group data-direction="column"       
>
      <group data-direction="column"  data-height="120" data-text-align="right"  data-justify="center">
        <input
          type="text"
          data-length="fit"
          value={input}
          readOnly
          data-text-align="right"
        //  placeholder="0"
          data-name="input-reset"
          data-text-size={result !== null ? "large" : "xxx-large"}
          data-opacity={result !== null ? "50" : ""}
         data-weight="300"
          data-duration=".225"
        />
<text data-ellipsis="" data-weight="300" data-duration=".225" data-text-size={result !== null ? "xxx-large" : "0"}>
{typeof result === 'number' ? result.toLocaleString() : '0'}
</text>
      </group>
      <group
        data-type="grid"
        data-gap="2"
        data-grid-template-columns="4"

data-contain=""
data-radius="10"
      >
        {buttons.map((button) => (
          <group
            key={button.label}
            onClick={button.action}
            data-ratio={button.type ? "" : "1:1"}
            data-row-end={button.type === "tall" ? "2" : ""}
            data-column-end={button.type === "wide" ? "2" : ""}
            data-background={button.background ? button.background :"highlight"}
            data-color={button.color}

//data-radius="3"
data-contain=""

          >
            <Ripple>
              <group
               
                data-direction="column"
                data-weight="600"

             

                data-justify="center"
                data-text-size="large"
                data-align="center"
                data-interactive=""
                data-cursor="pointer"
              >
                <text data-position="center">{button.label}</text>
              </group>
            </Ripple>
          </group>
        ))}
      </group>
    </group>
  );
};

export default Calculator;
