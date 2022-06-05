// Poweshell command to download Azure Library  ->  Install-Module -Name Az -Scope CurrentUser -Repository PSGallery -Force
// Connect to azure account                     ->  Connect-AzAccount 

const { Console } = require('console');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
var prompt = require('prompt-sync')();
const chalk = require('chalk');



const option = parseInt(prompt(chalk.blue.bold("1. Create New Storage Account || 2. Create a container || 3. Upload Blob to container || 4. List the items in container || 0 For exit   ")));

switch (option){

  case 0:
    break;
  case 1:
    var storage = prompt('Enter Storage name : ');
    async function test() {
      const { error,stdout, stderr } = await exec('New-AzStorageAccount -ResourceGroupName "arm-vscode" -Name "'+storage+'" -Location "eastus" -SkuName "Standard_RAGRS" -Kind "StorageV2"',{'shell':'powershell.exe'});
      if (stderr) {
        return {"error": stderr};
      }
      return {"data": stdout};
    };

    test().then( x => {

      console.log(chalk.green.bold('Storage account created'))
    }).catch(err=>{
    console.log(err.stderr)
    })
    break;
  
  case 2:
    var storage = prompt('Enter Storage name : ');
    var con = prompt('Enter Container Name : ');
    async function test1() {
      const { error,stdout, stderr } = await exec('$StorageAccount = Get-AzStorageAccount -ResourceGroupName "arm-vscode" -Name "'+storage+'";$Context = $StorageAccount.Context;New-AzStorageContainer -Name '+con+' -Context $Context -Permission Blob',{'shell':'powershell.exe'});
      if (stderr) {
        return {"error": stderr};
      }
      return {"data": stdout};
    };

    test1().then( x => {

      console.log(chalk.green.bold('Container Created'))
    }).catch(err=>{
    console.log(err.stderr)
    })
    break;

  case 3:
    var storage = prompt('Enter Storage name : ');
    var cont = prompt('Enter Container name : ');
    var file = prompt('Enter file path : ');
    var fname = prompt('Enter file name : ');
    async function test2() {
      const { error,stdout, stderr } = await exec('$StorageAccount = Get-AzStorageAccount -ResourceGroupName "arm-vscode" -Name "'+storage+'";$Context = $StorageAccount.Context;$Blob1HT = @{File = '+file+' ; Container        = "'+cont+'";Blob             = "'+fname+'"; Context          = $Context};Set-AzStorageBlobContent @Blob1HT',{'shell':'powershell.exe'});
      if (stderr) {
        return {"error": stderr};
      }
      return {"data": stdout};
    };

    test2().then( x => {

      console.log(chalk.green.bold('File Uploaded'))
    }).catch(err=>{
    console.log(err.stderr)
    })
    break;

  case 4:
    var storage = prompt('Enter Storage name : ');
    var con = prompt('Enter Container Name : ');
    async function test3() {
      const { error,stdout, stderr } = await exec('$StorageAccount = Get-AzStorageAccount -ResourceGroupName "arm-vscode" -Name "'+storage+'";$Context = $StorageAccount.Context;Get-AzStorageBlob -Container "'+con+'" -Context $Context ',{'shell':'powershell.exe'});
      if (stderr) {
        return {"error": stderr};
      }
      return {"data": stdout};
    };

    test3().then( x => {

      console.log(x.data)
    }).catch(err=>{
    console.log(err.stderr)
    })
    break;

  default :
  console.log(chalk.red.bold('Enter Valid Option'))
}
