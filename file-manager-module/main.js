const fs= require('fs')
const process = require("process")
const path = require("path");

var args = process.argv;
var pathName= path.dirname(args[1])+'/'


function display(){
    console.log("");
    console.log('Please type these commands to perform the following operations');
    console.log('---------------------------------'); 
    console.log('node main.js 1  -> To read file '); 
    console.log('node main.js 2  -> To create file'); 
    console.log('node main.js 3  -> To update file'); 
    console.log('node main.js 4  -> To delete file'); 
    console.log('node main.js 5  -> To create directory'); 
    console.log('node main.js 6  -> To delete directory'); 
    console.log('node main.js 7  -> To view the directory'); 
    console.log('node main.js 8  -> To rename the directory'); 
    console.log('node main.js 9  -> To Exit'); 
    console.log('---------------------------------  \n'); 
}
if (process.argv[2] === undefined) { 
    display()
   }
else { 
    if (args[2]==='1'){
        console.log('node main.js readFile "Filename" ')}
    if (args[2]==='2'){
        console.log('node main.js createFile "Foldername" "Filename" "text that the file will contain" ')}
    if (args[2]==='3'){
        console.log('node main.js updateFile "Foldername" "Filename" "text that will be updated in the file"')}
    if (args[2]==='4'){
        console.log('node main.js deleteFile "Foldername" "Filename" ')}
    if (args[2]==='5'){
        console.log('node main.js makeDir "Foldername" "path/"')}
    if (args[2]==='6'){
        console.log('node main.js delDir "Foldername" "path/"')}
    if (args[2]==='7'){
        console.log('node main.js readDir "Foldername" "path/"')}
    if (args[2]==='8'){
        console.log('node main.js renameDir "Old Foldername" "New Foldername" "path/"')}
    if (args[2]==='9'){
        process.exit()
    }
    else{
        console.log('Invalid argument/Syntax');
    }
    
    if (args[2]=='readFile'){
        try {
            const data = fs.readFileSync(args[3], 'utf8');
            console.log(data);
          } catch (err) {
            console.error(err);
          }
          display()
    }

    if (args[2]=='createFile'){
        var str=""
        for (let index = 5; index < args.length; index++) {
            str=str+" " +args[index];
        }
        fs.writeFileSync(pathName+args[3]+'/'+args[4], str, 
        console.log('File is created successfully!')
        )
        display();
    }

    if (args[2]=='deleteFile'){
        fs.unlinkSync(pathName+args[3]+'/'+args[4]);
        console.log('File deleted successfully!')
        display()
    }
    if (args[2]=='updateFile'){
        var str=""
        for (let index = 5; index < args.length; index++) {
            str=str+" " +args[index];
        }
        fs.writeFileSync(pathName+args[3]+'/'+args[4], str, 
        console.log('File is updated successfully!')
        );
        display()
    }
    if(args[2]=='makeDir'){
        if (!fs.existsSync(pathName + args[4] + args[3])) {
            fs.mkdirSync(pathName + args[4] + args[3]);
        }
            console.log('Directory is created successfully!')
            display()
    } 
    if(args[2]=='delDir'){
        fs.rmdir(pathName + args[4] + args[3], err => {
            if (err) {
              throw err;
            }
            console.log(`Directory ${args[3]} is deleted!`);
        });
        display()
    }
    if(args[2]=='readDir'){
        console.log('\n The '+args[3]+' directory consists : ');
        console.log(fs.readdirSync(pathName+ args[4] +args[3]));
        display()
    }
}
    if(args[2]=='renameDir'){
    fs.rename(pathName + args[5] +args[3], pathName + args[5] +args[4], err => {
        if (err) {
        console.error(err);
        }
    });
    console.log('Folder name is updated successfully!');
    display()
    }

