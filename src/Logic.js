/* Calculator Functions

current: the current term displayed on the calculator
previous: the previous term saved on the calculator. Null if empty.
operand: the previous operand saved on the calculator. Null if empty.
buttonText: the text of the button presssed

If operand is not empty and previous is empty, then we are temparily storing

*/
export default function calculate({ previous, operand, current }, buttonText) {
  // state to return
  var returnState = {
    previous: previous,
    operand: operand,
    current: current,
  };

  // clear button pressed
  if (buttonText === "AC") {
    returnState.previous = null;
    returnState.operand = null;
    returnState.current = "0";
    return returnState;
  }

  // handle infinity case
  if (current.includes("Infinity")) {
    return returnState;
  }

  // equal button pressed
  if (buttonText === "=") {
    if (operand && previous !== null) {
      returnState.current = operation(operand, previous, current);
      returnState.previous = null;
      returnState.operand = null;
    }
    return returnState;
  }

  // reverse sign pressed
  if (buttonText === "+/-") {
    returnState.operand = null;
    if (current[0] === "-") {
      returnState.current = current.substring(1);
    } else if (current !== "0") {
      returnState.current = "-" + current;
    }
    return returnState;
  }

  // standard operand (+, -, X, /) pressed
  if (
    buttonText === "+" ||
    buttonText === "-" ||
    buttonText === "X" ||
    buttonText === "/"
  ) {
    if (previous === null) {
      returnState.operand = buttonText;
    } else {
      returnState.current = operation(operand, previous, current);
      returnState.previous = null;
      returnState.operand = buttonText;
    }
    return returnState;
  }

  // percentage pressed
  if (buttonText === "%") {
    if (operand && previous !== null) {
      returnState.current = String(
        Number(operation(operand, previous, current)) / 100
      );
      returnState.previous = null;
      returnState.operand = null;
    } else {
      returnState.current = String(Number(current) / 100);
      returnState.operand = null;
    }
    return returnState;
  }

  // decimal pressed
  if (buttonText === ".") {
    if (!current.includes(".")) {
      returnState.current = current + buttonText;
    }
    return returnState;
  }

  // digit pressed
  if (current[0] === "0" && !(current.length > 1 && current[1] === ".")) {
    returnState.current = buttonText;
    return returnState;
  }
  if (operand && previous === null) {
    returnState.previous = current;
    returnState.current = buttonText;
    return returnState;
  }
  returnState.current = current + buttonText;
  return returnState;
}

// do standard calculator operations
function operation(operand, term1, term2) {
  if (operand === "+") {
    return String(Number(term1) + Number(term2));
  } else if (operand === "-") {
    return String(Number(term1) - Number(term2));
  } else if (operand === "/") {
    return String(Number(term1) / Number(term2));
  } else if (operand === "X") {
    return String(Number(term1) * Number(term2));
  }
  return "0";
}
