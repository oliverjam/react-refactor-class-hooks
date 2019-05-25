const React = require("react");
const { getPokemon } = require("./utils");
class Pokemon extends React.Component {
  state = {
    loading: true,
    data: null,
  };
  componentDidMount() {
    const { name } = this.props;
    getPokemon(name).then(data => this.setState({ data, loading: false }));
  }
  componentDidUpdate(prevProps) {
    const { name } = this.props;
    // re-fetch new pokemon if name has changed
    if (prevProps.name !== name) {
      this.setState({ loading: true });
      getPokemon(name).then(data => this.setState({ data, loading: false }));
    }
  }
  render() {
    const { loading, data } = this.state;
    if (loading) return <div>Loading...</div>;
    return (
      <div>
        <h2>{this.props.name}</h2>
        <img
          src={data.sprites.front_default}
          alt={`${data.name} default sprite`}
        />
      </div>
    );
  }
}

module.exports = Pokemon;
