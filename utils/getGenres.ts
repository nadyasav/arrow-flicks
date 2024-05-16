import { Genre, GenresList } from "../types/types";

export function getGenresStrById(ids: Array<number>, genres: Array<Genre>): string {
    let resultStr = '';
    for(let i = 0; i < ids.length; i++){
        const genre = genres.find((item) => item.id == ids[i]);

        if(!genre){
            continue;
        }

        if(resultStr) {
            resultStr += `, ${genre.name}`;
        } else {
            resultStr = genre.name;
        }
    }
    return resultStr;
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
            genresIds.push(genre.id.toString());
        } else {
            continue;
        }
    }
    return genresIds;
}
