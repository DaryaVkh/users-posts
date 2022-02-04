import {Dispatch, SetStateAction} from 'react';

export interface ICardProps {
    isCardVisible: boolean;
    setIsCardVisible: Dispatch<SetStateAction<boolean>>;
    cardStyles: object;
}