import * as fs from "fs";
import * as path from "path";

// reading the data
function readData() {
  const data = fs.readFileSync(path.resolve("weatherDb.txt"), "utf8");
  console.log(path.resolve("weatherDb.txt"));
  if (data.length === 0) {
    console.log("No data present in database");
  }
  console.log("Reading data.. \n");
  const objectData = JSON.parse(data);
  console.log(objectData);
}

// creating the data
function createData(location, temp, feels, condition) {
  fs.readFile(path.resolve("weatherDb.txt"), "utf-8", function (err, database) {
    if (err) {
      console.log(err);
      return;
    }
    if (database.length === 0) {
      fs.readFile(
        path.resolve("weatherDb.txt"),
        "utf-8",
        function (err, database) {
          if (err) {
            console.log(err);
            return;
          }
        }
      );
      const input = `[{"location":"${location}","tempC":${temp},"feelsLike":${feels},"condition":"${condition}"}]`;
      fs.writeFile(
        path.resolve("weatherDb.txt"),
        input,
        "utf-8",
        function (err) {
          console.log("File created");
        }
      );
    } else {
      fs.readFile(
        path.resolve("weatherDb.txt"),
        "utf-8",
        function (err, database) {
          if (err) {
            console.log(err);
            return;
          }
        }
      );
      const input = `,{"location":"${location}","tempC":${temp},"feelsLike":${feels},"condition":"${condition}"}]`;
      const replaced = database.replace("]", input);
      fs.writeFile(
        path.resolve("weatherDb.txt"),
        replaced,
        "utf-8",
        function (err) {
          console.log("File created");
        }
      );
    }
  });
}

//deleting the file
function deleteFile(location) {
  let data = fs.readFileSync(path.resolve("weatherDb.txt"), "utf-8");
  const arr = JSON.parse(data);
  arr.splice(
    arr.findIndex((a) => a.location === location),
    1
  );
  fs.writeFile("./weatherDb.txt", JSON.stringify(arr), "utf-8", function (err) {
    console.log(arr);
  });
}

//updating the data
function updateData(olddata, updateddata) {
  fs.readFile(path.resolve("weatherDb.txt"), "utf-8", function (err, database) {
    if (err) {
      console.log(err);
      return;
    }
    const tobereplaced = database.replace(`${olddata}`, `${updateddata}`);

    fs.writeFile(
      path.resolve("weatherDb.txt"),
      tobereplaced,
      "utf-8",
      function (err) {
        console.log("File updated");
      }
    );
  });
}

// readData()
// createData('Tripuira','35','30','mist')
// updateData('Tripuira','Tripura')
// deleteFile('Paris')
