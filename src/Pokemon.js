const React = require("react");
const { getPokemon } = require("./utils");
class Pokemon extends React.Component {
  state = {
    loading: true,
    data: null,
  };
  componentDidMount() {
    getPokemon("pikachu").then(data => this.setState({ data, loading: false }));
  }
  render() {
    const { loading, data } = this.state;
    if (loading) return <div>Loading...</div>;
    return (
      <div>
        <h2>{data.name}</h2>
        <img
          src={data.sprites.front_default}
          alt={`${data.name} default sprite`}
        />
      </div>
    );
  }
}

module.exports = Pokemon;
