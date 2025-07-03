import AnimalItem from "./AnimalItem";
import styles from './Favorits.module.css';

const Favorits = ({ favorits }) => {

  return (
    <ul className={styles.favorits}>
      {favorits.map((animal, index) => <AnimalItem src={animal} key={index} />)}
    </ul>
  );
}

export default Favorits;