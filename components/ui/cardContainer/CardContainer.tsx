import styles from './CardContainer.module.css';

interface ICardContainer {
    children?: React.ReactNode;
}

export const CardContainer = ({ children }: ICardContainer) => (
    <div className={styles.cardContainer}>
      {children}
    </div>
);
