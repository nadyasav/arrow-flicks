import { Genre } from "../types/types";

export function getGenresById(ids: Array<number>, genres: Array<Genre>): Array<Genre> {
    let resultArr = [];
    for(let i = 0; i <= ids.length; i++){
        const genre = genres.find((item) => item.id == ids[i]);
        if(genre){
            resultArr.push(genre);
        }
    }
    return resultArr;
}

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
