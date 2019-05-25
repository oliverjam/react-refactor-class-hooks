const React = require("react");

class Keyboard extends React.Component {
  state = {
    key: "",
  };
  handleKeyDown = event => {
    this.setState({ key: event.key });
  };
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }
  render() {
    return <div>{this.state.key || "Press any key"}</div>;
  }
}

module.exports = Keyboard;
