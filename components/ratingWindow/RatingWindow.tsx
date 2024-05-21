import { Button, Rating } from "@mantine/core";
import { memo, useCallback, useState } from "react";
import { PrimaryButton } from "../primaryButton/PrimaryButton";
import styles from './RatingWindow.module.css';
import textBtnClasses from '../../styles/textBtn.module.css';

interface IRatingWindow{
    title?: string;
    rating: number;
    onSave: (value: number) => void;
}

function RatingWindow(props: IRatingWindow) {
    const { title = '', rating, onSave } = props;
    const [ratingValue, setRatingValue] = useState(rating);

    const handleRatingChange = useCallback((value: number) => {
        setRatingValue(value);
    }, []);

    const handleSaveClick = useCallback(() => {
        if(ratingValue !== rating) {
            onSave(ratingValue);
        }
    }, [onSave, rating, ratingValue]);

    const handleRemoveClick = useCallback(() => {
        setRatingValue(0);
        if(rating !== 0) {
            onSave(0);
        }
    }, [onSave, rating]);

    return(
        <div className={styles.ratingWindow}>
            <h4>{title}</h4>
            <Rating fractions={1} count={10} value={ratingValue} onChange={handleRatingChange}
            classNames={{
                root: styles.ratingRoot,
                input: styles.ratingInput,
                starSymbol: styles.ratingStarSymbol
            }} />
            <div className={styles.btnsBox}>
                <PrimaryButton onClick={handleSaveClick} disabled={ratingValue === rating}>Save</PrimaryButton>
                <Button onClick={handleRemoveClick} disabled={ratingValue === 0}
                 classNames={textBtnClasses} className={styles.removeBtn}>Remove rating</Button>
            </div>
        </div>
    )
}

export default memo(RatingWindow);
