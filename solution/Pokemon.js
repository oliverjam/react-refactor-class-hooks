import React from "react";
import { getPokemon } from "./utils";

function Pokemon({ name }) {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    getPokemon(name).then(data => {
      setData(data);
    });
  }, [name]);
  if (!data) return <div>Loading...</div>;
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

export default Pokemon;
