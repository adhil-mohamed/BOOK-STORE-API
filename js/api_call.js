
const apikey="pGuPO2VU9ntNg1wbd8pnpAvGXALzMJUb";
const domain="https://api.nytimes.com"
let link=`${domain}/svc/books/v3/lists/overview.json?api-key=${apikey}`;
let getdataall=()=>{
    return fetch(link)
    .then(data => data.json())
    .then(data => { return data });
}
// let getdatafilter = (selectedValue) => {
//     return fetch(`${domain}/svc/books/v3/lists/current/${selectedValue}.json?api-key=${apikey}`)
//     .then(data => data.json())
//     .then(data => { return data });
// }
let getdatefilter=(selectedValue,date)=>{
    return fetch(`${domain}/svc/books/v3/lists/${date}/${selectedValue}.json?api-key=${apikey}`)
    .then(data => data.json())
    .then(data => { return data });
}
export {getdataall, getdatefilter}