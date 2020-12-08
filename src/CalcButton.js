import React from "react";

class CalcButton extends React.Component {
  getButtonId() {
    if (this.props.orange) {
      return "orange-button";
    } else if (this.props.wide) {
      return "wide-button";
    } else {
      return "";
    }
  }

  render() {
    return (
      <div
        onClick={() => this.props.onClick(this.props.text)}
        className="calc-button"
        id={this.getButtonId()}
      >
        {this.props.text}
      </div>
    );
  }
}
export default CalcButton;
