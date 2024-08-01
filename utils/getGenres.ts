import { Genre, GenresList } from "../types/types";

export function getGenresNamesByIds(ids: Array<number | string>, genres: Array<Genre>): Array<string> {
    const resultArr = [];
    for(let i = 0; i < ids.length; i++){
        const genre = genres.find((item) => item.id == ids[i]);

        if(!genre){
            continue;
        }

        resultArr.push(genre.name);
    }
    return resultArr;
}

export function getGenresStr(genres: Array<Genre>): string {
    let resultStr = '';
    genres.forEach((item) => {
        if(resultStr) {
            resultStr += `, ${item.name}`;
        } else {
            resultStr = item.name;
        }
    });
    return resultStr;
}

export const getGenresNamesArr = (genres: GenresList) => {
    return genres.map((item) => item.name);
};

export const getGenresIdsByNames = (names: Array<string>, genres: GenresList) => {
    let genresIds = [];
    for(let i = 0; i < names.length; i++){
        const genre = genres.find((item) => item.name == names[i]);

        if(genre !== undefined) {
            genresIds.push(genre.id);
        } else {
            continue;
        }
    }
    return genresIds;
}

export function geFilteredGenres(names: Array<string>, genres: Array<Genre>): Array<string> {
    const resultArr = [];
    for(let i = 0; i < names.length; i++){
        const genre = genres.find((item) => item.name == names[i]);

        if(!genre){
            continue;
        }

        resultArr.push(genre.name);
    }
    return resultArr;
}
