import AnimalItem from "./AnimalItem";

const Favorits = ({ favorits }) => {

  return (
    <ul className="favorits">
      {favorits.map((animal, index) => <AnimalItem src={animal} key={index} />)}
    </ul>
  );
}

export default Favorits;