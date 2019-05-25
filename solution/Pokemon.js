import React from "react";
import { getPokemon } from "./utils";

function Pokemon({ name }) {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    setLoading(true);
    getPokemon(name).then(data => {
      setData(data);
      setLoading(false);
    });
  }, [name]);
  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <h2>{name}</h2>
      <img
        src={data.sprites.front_default}
        alt={`${data.name} default sprite`}
      />
    </div>
  );
}
// class Pokemon extends React.Component {
//   state = {
//     loading: true,
//     data: null,
//   };
//   componentDidMount() {
//     const { name } = this.props;
//     getPokemon(name).then(data => this.setState({ data, loading: false }));
//   }
//   componentDidUpdate(prevProps) {
//     const { name } = this.props;
//     // re-fetch new pokemon if name has changed
//     if (prevProps.name !== name) {
//       this.setState({ loading: true });
//       getPokemon(name).then(data => this.setState({ data, loading: false }));
//     }
//   }
//   render() {
//     const { loading, data } = this.state;
//     if (loading) return <div>Loading...</div>;
//     return (
//       <div>
//         <h2>{this.props.name}</h2>
//         <img
//           src={data.sprites.front_default}
//           alt={`${data.name} default sprite`}
//         />
//       </div>
//     );
//   }
// }

export default Pokemon;
