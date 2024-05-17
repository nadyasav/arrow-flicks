export const GetYearsArr = (endYear: number, startYear = new Date().getFullYear()): Array<string> => {
    const resultArr = [];
    for(let i = startYear; i >= endYear; i--){
        resultArr.push(i.toString());
    }
    return resultArr;
}
