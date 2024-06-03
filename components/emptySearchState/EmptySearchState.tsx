import Image from 'next/image';
import styles from './EmptySearchState.module.css';

export default function EmptySearchState() {
  return (
    <div className={styles.container}>
       <div className={styles.imgBox}>
          <Image alt='404_img' src='/img/searchEmpty.svg' width="100" height="100" layout="responsive" objectFit="contain"></Image>
        </div>
      <h2 className={styles.text}>We don&apos;t have such movies, look for another one</h2>
    </div>
  )
}
