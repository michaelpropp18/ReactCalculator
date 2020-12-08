import React, { Component } from "react";
import "./App.css";
import CalcButton from "./CalcButton";
import calculate from "./Logic";

class App extends Component {
  state = { current: "0", previous: null, operand: null };

  buttonData = [
    { text: "AC" },
    { text: "+/-" },
    { text: "%" },
    { text: "/", orange: true },
    { text: "7" },
    { text: "8" },
    { text: "9" },
    { text: "X", orange: true },
    { text: "4" },
    { text: "5" },
    { text: "6" },
    { text: "-", orange: true },
    { text: "1" },
    { text: "2" },
    { text: "3" },
    { text: "+", orange: true },
    { text: "0", wide: true },
    { text: "." },
    { text: "=", orange: true },
  ];

  onButtonClick = (buttonText) => {
    const { previous, current, operand } = calculate(this.state, buttonText);
    this.setState({
      previous: previous,
      current: current,
      operand: operand,
    });
    console.log(previous, current, operand);
  };

  render() {
    return (
      <div className="grid-container">
        <div id="answer-button" className="calc-button">
          {this.state.current}
        </div>
        {this.buttonData.map((b) => {
          return (
            <CalcButton
              key={b.text}
              onClick={this.onButtonClick}
              text={b.text}
              wide={b.wide}
              orange={b.orange}
            ></CalcButton>
          );
        })}
      </div>
    );
  }
}

export default App;
