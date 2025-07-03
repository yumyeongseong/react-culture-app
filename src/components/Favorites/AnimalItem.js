import styles from './AnimalItem.module.css'

const AnimalItem = ({ src, alt }) => (
  <li className={styles.listItem}>
    <img src={src} alt={alt} className={styles.animalImage}/>
  </li>
);

export default AnimalItem;