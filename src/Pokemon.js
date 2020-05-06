import React from "react";
import { getPokemon } from "./utils";
class Pokemon extends React.Component {
  state = {
    data: null,
  };
  componentDidMount() {
    const { name } = this.props;
    getPokemon(name).then((data) => this.setState({ data }));
  }
  componentDidUpdate(prevProps) {
    const { name } = this.props;
    // re-fetch new pokemon if name prop has changed
    if (prevProps.name !== name) {
      getPokemon(name).then((data) => this.setState({ data }));
    }
  }
  render() {
    // render loading until the fetch promise resolves
    if (!this.state.data) return <div>Loading...</div>;
    return (
      <div>
        <h2>{this.state.data.name}</h2>
        <img
          src={this.state.data.sprites.front_default}
          alt={`${this.state.data.name} default sprite`}
        />
      </div>
    );
  }
}

export default Pokemon;
