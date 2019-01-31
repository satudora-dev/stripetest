const date = new Date(Date.now());
const years = date.getFullYear();
const month = "0" + date.getMonth() + 1;
const day = "0" + date.getDate();
const hours = date.getHours();
const minutes = "0" + date.getMinutes();
const formattedTime = years + "-" + month.substr(-2) + "-" + day.substr(-2) +"  " + hours + "時" + minutes.substr(-2) +"分";
console.log(formattedTime)
