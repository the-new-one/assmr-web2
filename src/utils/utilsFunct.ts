import moment from "moment";

export const toUpperCase = (name: string) => {
    let newName = name.split(',');

    let tempName:string = "";
    for(let i = 0; i < newName.length; i++) {
        tempName += newName[i].substring(0, 1).toUpperCase()+newName[i].substring(1, newName[i].length);
    }

    return tempName;
}
export const formatDate = (param: string): string => {
    return moment(param).format('LL');
  };