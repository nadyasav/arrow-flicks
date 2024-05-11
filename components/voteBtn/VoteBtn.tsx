import styles from './VoteBtn.module.css';
import { ActionIcon, useMantineTheme } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { IconStarFilled } from '@tabler/icons-react';

interface IVoteBtn {
    onClick: () => void;
    rating?: number;
}

export const VoteBtn = (props: IVoteBtn) => {
    const theme = useMantineTheme();
    const { hovered, ref } = useHover();
    const iconColor = props.rating ? theme.other.colors.purple[4] : theme.other.colors.grey[2];

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        props.onClick();
    };

    return (
        <div className={styles.voteBtnBox}>
            <div ref={ref}>
                <ActionIcon size={28} variant='transparent' onClick={handleClick}>
                    <IconStarFilled size={26} color={hovered ? theme.other.colors.purple[4] : iconColor} className={styles.icon}/>
                </ActionIcon>
            </div>
            {props.rating ? <span>{props.rating}</span> : ''}
        </div>
    );
};
