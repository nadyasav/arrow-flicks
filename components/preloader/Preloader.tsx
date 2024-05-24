import { Loader } from "@mantine/core";
import styles from './Preloader.module.css';

export default function Preloader() {
  return (
    <div className={styles.preloaderBox}>
      <Loader className={styles.preloader} />
    </div>
  )
}
