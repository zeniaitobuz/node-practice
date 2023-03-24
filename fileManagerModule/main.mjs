import * as fs from "fs/promises";
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
  let task = Number(input[0]);
  if (data.toString().trimEnd().split(" ")[0] === "9") {
    process.exit();
  } else {
    if (task === 1) {
      console.log('Enter 11 "Foldername/" "Filename" ');
    } else if (task === 2) {
      console.log(
        'Enter 12 "Foldername/" "Filename" "text that the file will contain" '
      );
    } else if (task === 3) {
      console.log(
        'Enter 13 "Foldername/" "Filename" "text that will be updated in the file"'
      );
    } else if (task === 4) {
      console.log('Enter 14 "Foldername/" "Filename" ');
    } else if (task === 5) {
      console.log('Enter 15 "Foldername" "path/"');
    } else if (task === 6) {
      console.log('Enter 16 "Foldername" "path/"');
    } else if (task === 7) {
      console.log('Enter 17 "Foldername" "path/"');
    } else if (task === 8) {
      console.log('Enter 18 "Old Foldername" "New Foldername" "path/"');
    } else {
      console.log("Invalid argument/Syntax");
    }

    if (task === 11) {
      readingFile();
      async function readingFile() {
        try {
          const data = await fs.readFile(
            pathName + input[1] + input[2],
            "utf8"
          );
          console.log(data);
        } catch (err) {
          console.error("Sorry! The file you are trying to read doesn't exist");
        }
        display();
      }
    }

    if (task === 12) {
      creatingFile();
      async function creatingFile() {
        let str = "";
        for (let index = 3; index < input.length; index++) {
          str = `${str} ${input[index]}`;
        }
        await fs.writeFile(
          pathName + input[1] + input[2],
          str,
          console.log("File is created successfully!")
        );
      }
      display();
    }

    if (task === 14) {
      deletingFile();
      async function deletingFile() {
        try {
          await fs.unlink(pathName + input[1] + input[2]);
          console.log("File deleted successfully!");
          display();
        } catch (err) {
          console.log("Sorry! The file you are trying to delete doesn't exist");
        }
      }
    }
    if (task === 13) {
      updatingFile();

      async function updatingFile() {
        try {
          let str = "";
          for (let index = 3; index < input.length; index++) {
            str = `${str} ${input[index]}`;
          }
          await fs.writeFile(
            pathName + input[1] + input[2],
            str,
            console.log("File is updated successfully!")
          );
        } catch (err) {
          console.log("Sorry! The file you are trying to update doesn't exist");
        }
        display();
      }
    }
    if (task === 15) {
      creatingFolder();
      async function creatingFolder() {
        await fs.mkdir(pathName + input[2] + input[1]);
        console.log("Directory is created successfully!");
      }
      display();
    }
    if (task === 16) {
      deletingFolder();

      async function deletingFolder() {
        try {
          await fs.rmdir(pathName + input[2] + input[1]);
          console.log(`Directory ${input[1]} is deleted!`);
        } catch (err) {
          console.log(
            "Sorry! The folder you are trying to delete doesn't exist"
          );
        }
        display();
      }
    }
    if (task === 17) {
      readingFolder();
      async function readingFolder() {
        try {
          console.log("\n The " + input[1] + " directory consists : ");
          console.log(await fs.readdir(pathName + input[2] + input[1]));
        } catch (err) {
          console.log("Sorry! The folder you are trying to read doesn't exist");
        }
        display();
      }
    }
    if (task === 18) {
      renameFolder();

      async function renameFolder() {
        try {
          await fs.rename(
            pathName + input[3] + input[1],
            pathName + input[3] + input[2],
            (err) => {
              if (err) {
                console.error(err);
              }
            }
          );
          console.log("Folder name is updated successfully!");
        } catch (err) {
          console.log(
            "Sorry! The folder you are trying to rename doesn't exist"
          );
        }
        display();
      }
    }
  }
});
