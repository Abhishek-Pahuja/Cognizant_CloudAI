var fs = require('fs');
const chalk = require('chalk');

const fileUpload = (fileName,callback)=>{
    try{
        var data = fs.readFileSync(fileName,'utf8');
        return callback(undefined,data.toString());
    } catch(e) {
        return callback('File not Found ',undefined)
    }
}
function clsCount(content,callback){
    var cls = /First|Second|Third/gim;
    var arr = content.match(cls);
    const count = {};
    for (const element of arr) {
        if (count[element]) {
        count[element] += 1;
        } else {
            count[element] = 1;
        }
    }
    return callback(count)
}

const gCount = (content,callback)=>{
    var gen = /male|female/gim;
    var genders = content.match(gen);
    const count = {};
    for (const element of genders) {
        if (count[element]) {
        count[element] += 1;
        } else {
            count[element] = 1;
        }
    }
    return callback(count)
}

function numbers(content,callback){
    var fare = /[0-9.]+/gim;
    var arr = content.match(fare);
    var sArr = arr.slice(1,10);
    
    return callback(sArr)
}

const curr = (content,callback)=>{
    var replace = content.replace('$','₹')
    const str = replace.substring(0,46)
    return(callback('$ -> ₹ = '+str))
}

const towns = (content,callback)=>{
    var towns = /Queenstown|Southampton/gim;
    var cTown = content.match(towns);
    const count = {};
    for (const element of cTown) {
        if (count[element]) {
        count[element] += 1;
        } else {
            count[element] = 1;
        }
    }
    return callback(count)
}

function Random1(content,callback){
    const str = content.slice(0,67);
    var reg = new RegExp('male');
    var arr = reg.test(str);
    return callback('Checking for "'+reg+'" in {'+str+'} Results :- '+arr)
}

function splitFun(content,callback){
    const str = content.slice(0,67);
    var arr = str.split(';');
    var filtered = arr.filter(function (el) {
        return (el !== (undefined || null || ''));
      });
    return callback(filtered)
}

function rego(content,callback){
    const gen = gCount(content,(arr)=>{return arr});
    const fare = numbers(content,(arr)=>{return arr});
    const cls = clsCount(content,(arr)=>{return arr});
    const townCount = towns(content,(arr)=>{return arr});
    const replace = curr(content,(arr)=>{return arr});
    const ran1 = Random1(content,(arr)=>{return arr});
    const split = splitFun(content,(arr)=>{return arr});

    var results = {
        Gender_Count     : gen,
        Class_Count      : cls,
        Town_Count       : townCount,
        Replace_Currency : replace,
        Fares            : fare,
        Using_Test       : ran1 ,
        Using_Split      : split
    }
    if (callback && typeof(callback) === "function") {
        console.log(chalk.blue.bold.underline("  Results  "));
        callback(results); //call the function that was passed in 
    }
}


module.exports={
    fileUpload : fileUpload,
    rego       : rego
}