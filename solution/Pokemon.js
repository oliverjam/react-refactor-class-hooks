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

export default Pokemon;
