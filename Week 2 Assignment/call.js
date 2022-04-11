const eta = require('./eta.js')
const prompt = require('prompt-sync')();
const chalk = require('chalk');

const fileName = prompt(chalk.green.bold('Enter File name with extension : '));

const content = eta.fileUpload(fileName,(error,file)=>{
    if(error){return error}
    else { return file }
})

eta.rego(content, function(rslt){
    console.log(rslt);
});