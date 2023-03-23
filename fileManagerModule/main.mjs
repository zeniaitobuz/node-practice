import * as fs from "fs";
import * as path from "path";
import * as process from "process";

function display() {
  console.log(
    "\n Please type these commands to perform the following operations"
  );
  console.log("---------------------------------------");
  console.log("Enter '1'  -> To read file ");
  console.log("Enter '2'  -> To create file");
  console.log("Enter '3'  -> To update file");
  console.log("Enter '4'  -> To delete file");
  console.log("Enter '5'  -> To create directory");
  console.log("Enter '6'  -> To delete directory");
  console.log("Enter '7'  -> To view the directory");
  console.log("Enter '8'  -> To rename the directory");
  console.log("Enter '9'  -> To exit");
  console.log("----------------------------------------\n");
}
display();

let args = process.argv;
let pathName = path.dirname(args[1]) + "/";
process.stdin.on("data", (data) => {
  let input = data.toString().trim().split(" ");

  if (data.toString().trimEnd().split(" ")[0] === "9") {
    process.exit();
  } else {
    if (input[0] === "1") {
      console.log('Enter readFile "Foldername/" "Filename" ');
    } else if (input[0] === "2") {
      console.log(
        'Enter createFile "Foldername/" "Filename" "text that the file will contain" '
      );
    } else if (input[0] === "3") {
      console.log(
        'Enter updateFile "Foldername/" "Filename" "text that will be updated in the file"'
      );
    } else if (input[0] === "4") {
      console.log('Enter deleteFile "Foldername/" "Filename" ');
    } else if (input[0] === "5") {
      console.log('Enter makeDirectory "Foldername" "path/"');
    } else if (input[0] === "6") {
      console.log('Enter delDirectory "Foldername" "path/"');
    } else if (input[0] === "7") {
      console.log('Enter readDirectory "Foldername" "path/"');
    } else if (input[0] === "8") {
      console.log(
        'Enter renameDirectory "Old Foldername" "New Foldername" "path/"'
      );
    } else {
      console.log("Invalid argument/Syntax");
    }

    if (input[0] === "readFile") {
      try {
        const data = fs.readFileSync(pathName + input[1] + input[2], "utf8");
        console.log(data);
      } catch (err) {
        console.error(err);
      }
      display();
    }

    if (input[0] === "createFile") {
      let str = "";
      for (let index = 3; index < input.length; index++) {
        str = str + " " + input[index];
      }
      fs.writeFileSync(
        pathName + input[1] + input[2],
        str,
        console.log("File is created successfully!")
      );
      display();
    }

    if (input[0] === "deleteFile") {
      fs.unlinkSync(pathName + input[1] + input[2]);
      console.log("File deleted successfully!");
      display();
    }
    if (input[0] === "updateFile") {
      let str = "";
      for (let index = 3; index < input.length; index++) {
        str = str + " " + input[index];
      }
      fs.writeFileSync(
        pathName + input[1] + input[2],
        str,
        console.log("File is updated successfully!")
      );
      display();
    }
    if (input[0] === "makeDirectory") {
      if (!fs.existsSync(pathName + input[2] + input[1])) {
        fs.mkdirSync(pathName + input[2] + input[1]);
      }
      console.log("Directory is created successfully!");
      display();
    }
    if (input[0] === "delDirectory") {
      fs.rmdir(pathName + input[2] + input[1], (err) => {
        if (err) {
          throw err;
        }
        console.log(`Directory ${input[1]} is deleted!`);
      });
      display();
    }
    if (input[0] === "readDirectory") {
      console.log("\n The " + input[1] + " directory consists : ");
      console.log(fs.readdirSync(pathName + input[2] + input[1]));
      display();
    }
    if (input[0] === "renameDirectory") {
      fs.rename(
        pathName + input[3] + input[1],
        pathName + input[3] + input[2],
        (err) => {
          if (err) {
            console.error(err);
          }
        }
      );
      console.log("Folder name is updated successfully!");
      display();
    }
  }
});
